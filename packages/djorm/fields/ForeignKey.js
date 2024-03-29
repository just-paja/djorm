const camelCase = require('camelcase')

const { Field } = require('../models/AttrModel')
const { getModel, getModelName, SELF } = require('../models/ModelRegistry')
const { isNullish } = require('../values')
const { PositiveIntegerField } = require('./PositiveIntegerField')
const { Relation } = require('./Relation')
const { ValueError } = require('../errors')

/** Field used for foreign key objects
 *  @augments {Relation}
 */
class ForeignKey extends Relation {
  static keyField = new Field()
  static keyFieldType = new Field()
  static model = new Field()
  static parentModel = new Field()
  static relatedName = new Field()

  constructor (params) {
    super(params)
    const KeyFieldType = this.get('keyFieldType') || PositiveIntegerField
    if (!this.keyField) {
      this.keyField = this.getKeyFieldName()
    }
    if (!this.relatedName) {
      this.relatedName = this.getTargetModelName()
    }
    if (!this.parentModel) {
      this.parentModel = SELF
    }
    this.foreignKeyField = new KeyFieldType({
      null: this.null
    })
    this.expandedField = {
      [this.keyField]: this.foreignKeyField
    }
  }

  getKeyFieldName () {
    return `${camelCase(this.getTargetModelName())}Id`
  }

  getTargetModelName () {
    return this.get('model')
  }

  resolveValueInstance (parentInstance, fieldName) {
    const value = parentInstance.get(fieldName)
    if (value) {
      return value
    }
    const Model = getModel(this.model)
    const newInstance = new Model()
    parentInstance[fieldName] = newInstance
    return newInstance
  }

  expand () {
    return this.expandedField
  }

  parse (value, inst) {
    let parsed = value
    const Model = getModel(this.model === SELF ? inst.constructor : this.model)
    if (parsed && !(parsed instanceof Model)) {
      if (typeof parsed === 'object') {
        parsed = Model.from(parsed)
      } else {
        throw new ValueError(
          `Value must be instance of "${getModelName(
            Model
          )}" or null, but "${parsed}" was given`
        )
      }
    }
    if (inst && parsed) {
      inst.set(this.keyField, parsed.pk)
    }
    return parsed
  }

  queryParentModel (modelName, primaryInstance) {
    return getModel(modelName).objects.filter({
      [this.keyField]: primaryInstance.pk
    })
  }

  queryTargetModel (fkInstance) {
    const modelName = this.getTargetModelName()
    const Model = getModel(
      modelName === SELF ? getModelName(fkInstance.constructor) : modelName
    )
    return Model.objects.filter({
      [Model.pkName]: fkInstance.get(this.keyField)
    })
  }

  async fetch (inst) {
    const model = getModel(this.model)
    return await model.objects.get({
      [model.pkName]: this.getForeignKeyValue(inst)
    })
  }

  getForeignKeyValue (inst) {
    return inst.get(this.keyField)
  }

  isNull (value, inst, fieldName) {
    return (
      super.isNull(value, inst, fieldName) &&
      isNullish(this.getForeignKeyValue(inst), inst, this.keyFieldName)
    )
  }
}

module.exports = { ForeignKey }
