const { concatValidators, filterUnique } = require('../filters')
const { FieldError, FieldValidationError, UnknownField } = require('../errors')
const { getModelName, registerModel } = require('./ModelRegistry')
const { isNullish } = require('../values')

let FieldModel = null

function parseFieldObjects (constructor) {
  return Object.entries(constructor)
    .filter(([key, value]) => value && value instanceof FieldModel)
    .reduce((aggr, fieldTuple) => {
      const expanded = fieldTuple[1].expand()
      aggr.push(fieldTuple)
      if (expanded) {
        return aggr.concat(Object.entries(expanded))
      }
      return aggr
    }, [])
}

class AttrModel {
  /**
   * @param {object} params
   */
  constructor (params = {}) {
    this.setValues(params)
  }

  static from (value) {
    if (!value) {
      return null
    }
    const Model = this
    if (value instanceof Model) {
      return value
    }
    const inst = new Model()
    for (const [fieldName, fieldValue] of Object.entries(value)) {
      inst[fieldName] = Model.getField(fieldName).fromDb(fieldValue, inst)
    }
    return inst
  }

  static get fields () {
    return this.fieldObjects
      .map(([key, value]) => ({ [key]: value }))
      .reduce((aggr, chunk) => Object.assign(aggr, chunk), {})
  }

  static get fieldObjects () {
    const cached = Object.getOwnPropertyDescriptor(this, 'fieldObjectsCached')
    if (cached && cached.value) {
      return cached.value
    }
    let props = []
    let obj = this
    do {
      props = props.concat(parseFieldObjects(obj))
      obj = Object.getPrototypeOf(obj)
    } while (obj && obj !== Function)
    if (props.length) {
      Object.defineProperty(this, 'fieldObjectsCached', {
        value: props,
        enumerable: false
      })
    }
    return props
  }

  static get fieldNames () {
    return this.fieldObjects.map(([key, value]) => key)
  }

  static get selection () {
    return this.fieldObjects
      .filter(([key, value]) => value.db && !value.secret)
      .map(([key, value]) => key)
      .filter(filterUnique)
  }

  static getField (fieldName) {
    const fieldAttrs = this.fieldObjects.find(
      ([name, field]) => name === fieldName
    )
    if (fieldAttrs && fieldAttrs[1] instanceof FieldModel) {
      return fieldAttrs[1]
    }
    throw new UnknownField(
      `Unknown field "${fieldName}" for model "${getModelName(this)}"`
    )
  }

  static register () {
    return registerModel(this)
  }

  get (fieldName) {
    const value = this[fieldName]
    if (value === undefined) {
      const field = this.constructor.getField(fieldName)
      const defaultValue = field.getDefault(this)
      if (defaultValue !== undefined) {
        this.set(fieldName, defaultValue)
      }
      return defaultValue
    }
    return value
  }

  set (fieldName, value) {
    const field = this.constructor.getField(fieldName)
    try {
      this[fieldName] = field.parse(value, this)
    } catch (e) {
      if (e instanceof FieldError) {
        e.message = `${e.message} when processing value for ${getModelName(
          this.constructor
        )}.${fieldName}`
      }
      throw e
    }
    return this
  }

  getValues () {
    return this.constructor.fieldObjects
      .filter(([key, field]) => !field.private)
      .reduce((aggr, [key, field]) => {
        const value = this.get(key)
        if (typeof value !== 'undefined') {
          aggr[key] = value
        }
        return aggr
      }, {})
  }

  setValues (params = {}) {
    const entries = Object.entries(params)
    for (const [key, value] of entries) {
      this.set(key, value)
    }
    return this
  }

  toJson (includePrivate = false) {
    return this.constructor.fieldObjects.reduce((aggr, [key, field]) => {
      if (field.private && !includePrivate) {
        return aggr
      }
      const value = field.serialize(this.get(key))
      if (typeof value !== 'undefined') {
        aggr[key] = value
      }
      return aggr
    }, {})
  }

  async validate () {
    const validator = concatValidators(
      ...this.constructor.fieldObjects.map(([fieldName, field]) => async inst =>
        await field.validateValue(inst.get(fieldName), inst, fieldName)
      )
    )
    await validator(this)
  }
}

/** Generic Field */
class GenericField extends AttrModel {
  /** Break down complex field into additional field instances. This enables
   *  complex fields, like ForeignKey - as it is composed of the non-db field
   *  and the database foreign key value field.
   */
  expand () {
    return null
  }
}

FieldModel = GenericField

class FieldBase extends GenericField {
  static default = new FieldBase()

  /** Based on Robustness principle, fields will accept various representations
   *  of the actual value and try to parse it into a strict model value
   *  representation or fail
   *  @param {any} value Field value
   *  @param {DatabaseModel} inst Model instance
   *  @returns {any} Model value representation
   */
  parse (value, inst) {
    return value
  }

  /** Convert database representation of the value into the instance
   *  representation of the value
   *  @param {any} value
   *  @param {DatabaseModel} inst Model instance
   *  @return {any} Model value representation
   */
  fromDb (value, inst) {
    return this.parse(value, inst)
  }

  /** Serialize value in a way that would be represented in the database */
  toDb (value) {
    return this.serialize(value)
  }

  /** Serialize model value representation into JSON */
  serialize (value) {
    return value
  }

  /** Get default value for this field based on the current instance
   * @param {AttrModel} inst
   * @returns {any}
   */
  getDefault (inst) {
    if (this.default instanceof Function) {
      return this.default(inst)
    }
    return typeof this.default === 'undefined' && this.null
      ? null
      : this.default
  }
}

class Field extends FieldBase {
  static null = new FieldBase({ default: false })
  static private = new FieldBase({ default: false })
  static secret = new FieldBase()
  static validator = new FieldBase()

  isNull (value, inst, fieldName) {
    return isNullish(value)
  }

  validateNullValue (value, inst, fieldName) {
    if (this.isNull(value, inst, fieldName)) {
      throw new FieldValidationError(
        inst,
        fieldName,
        `Passed \`null\` to non-null field ${getModelName(
          inst.constructor
        )}.${fieldName}`
      )
    }
  }

  /** Given this field has a validator, try to run it as a callback. Callback
   *  will receive field value, the model instance, and field name as
   *  arguments.
   */
  async validateValue (value, inst, fieldName) {
    if (!this.null && !this.autoIncrement) {
      this.validateNullValue(value, inst, fieldName)
    }
    return this.validator ? await this.validator(value, inst, fieldName) : null
  }
}

module.exports = {
  AttrModel,
  Field,
  filterUnique,
  parseFieldObjects
}
