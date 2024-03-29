const { DatabaseModelBase } = require('./DatabaseModelBase')
const { Delete } = require('../db/Delete')
const { ForeignKey } = require('../fields/ForeignKey')
const { Insert } = require('../db/Insert')
const { ObjectManager } = require('./ObjectManager')
const { FieldError, ObjectNotFound, UnknownField } = require('../errors')
const { parseFieldObjects } = require('./AttrModel')
const { Relation } = require('../fields/Relation')
const { Update } = require('../db/Update')
const {
  isAbstract,
  getModel,
  getModelName,
  getRelationship
} = require('./ModelRegistry')

const databaseHub = require('../db/DatabaseHub')
const nonEmpty = item => Boolean(item)

const FIELD_SEPARATOR = '__'

class DatabaseModel extends DatabaseModelBase {
  static NotFound = ObjectNotFound
  static pkName = 'id'
  static tableName = null
  static manager = ObjectManager
  static dbName = 'default'

  static get objects () {
    const cache = Object.getOwnPropertyDescriptor(this, 'managerInstance')
    if (cache && cache.value) {
      return cache.value
    }
    const Manager = this.manager
    const value = new Manager(this)
    Object.defineProperty(this, 'managerInstance', { value })
    return value
  }

  static get db () {
    return databaseHub.get(this.dbName)
  }

  static get table () {
    return [
      this.db.getSchema(),
      this.tableName || getModelName(this).toLowerCase()
    ]
      .filter(nonEmpty)
      .join('.')
  }

  static get relationFields () {
    return this.fieldObjects.filter(
      ([fieldName, field]) => field instanceof Relation
    )
  }

  static get foreignKeyFields () {
    return this.relationFields.filter(
      ([fieldName, field]) => field instanceof ForeignKey
    )
  }

  static async create (values) {
    return await this.from(values).save()
  }

  get pk () {
    return this[this.constructor.pkName]
  }

  rel (relatedName) {
    try {
      const field = this.constructor.getField(relatedName)
      return field.queryTargetModel(this)
    } catch (e) {
      if (e instanceof UnknownField) {
        const [parentModelName, parentFieldName] = getRelationship(
          this.constructor,
          relatedName
        )
        return getModel(parentModelName)
          .getField(parentFieldName)
          .queryParentModel(parentModelName, this)
      }
      throw e
    }
  }

  /**
   *  Used by DatabaseMapper to compose data into nested instances. Returns
   *  field target as an array of [
   *   target DatabaseModel instance,
   *   target Field instance,
   *   target field name
   *  ]. The value should be written into the returned instance.
   *
   * @param {string} fieldPath Field path separated by double underscore
   * @returns {[DatabaseModel, Field, string]}
   */
  getFieldTarget (fieldPath, value) {
    const separatorIndex = fieldPath.indexOf(FIELD_SEPARATOR)
    if (separatorIndex === -1) {
      try {
        return [this, this.constructor.getField(fieldPath), fieldPath]
      } catch (e) {
        if (e instanceof FieldError) {
          return null
        }
        throw e
      }
    }
    if (value === null) {
      return null
    }
    const localFieldName = fieldPath.substr(0, separatorIndex)
    const field = this.constructor.getField(localFieldName)
    if (field.resolveValueInstance instanceof Function) {
      return field
        .resolveValueInstance(this, localFieldName)
        .getFieldTarget(
          fieldPath.substr(separatorIndex + FIELD_SEPARATOR.length)
        )
    }
    throw new FieldError(
      `Field ${getModelName(
        this
      )}.${fieldPath} does not accept nested properties`
    )
  }

  consumeDbValue (fieldPath, value) {
    try {
      const target = this.getFieldTarget(fieldPath, value)
      if (target) {
        const [inst, field, fieldName] = target
        inst[fieldName] = field.fromDb(
          this.constructor.db.parseValue(field, value),
          inst
        )
      }
    } catch (e) {
      if (e instanceof FieldError) {
        e.message = `${e.message} when processing value for ${getModelName(
          this.constructor
        )}.${fieldPath}`
        throw e
      }
    }
  }

  async fetchRelationship (fieldName) {
    if (!this.get(fieldName)) {
      this.set(
        fieldName,
        await this.constructor.getField(fieldName).fetch(this)
      )
    }
  }

  async saveForeignKeys () {
    const values = await Promise.all(
      this.constructor.foreignKeyFields
        .map(([fieldName, field]) => [field, this.get(fieldName)])
        .filter(([field, value]) => Boolean(value))
        .map(async ([field, value]) => [field, await value.save()])
    )
    values.forEach(([field, value]) => {
      this.set(field.keyField, value.get(value.constructor.pkName))
    })
  }

  async saveFiles () {
    await Promise.all(
      this.constructor.fieldObjects
        .filter(([name, field]) => field.saveFileValue)
        .map(([name, field]) => field.saveFileValue(this, name, this.get(name)))
    )
  }

  async create () {
    await this.saveForeignKeys()
    await this.saveFiles()
    const cascade = this.serializeDbValues()
    let inject = {}
    for (const row of cascade) {
      const result = await new Insert()
        .target(row.model)
        .values({ ...row.values, ...inject })
        .exec()
      if (result.insertId && !this.pk) {
        this.set(row.model.pkName, result.insertId)
        // Set this back to the cascade ^^
        inject = { ...inject, [row.model.pkName]: result.insertId }
      }
    }
    return this
  }

  async update () {
    await this.saveForeignKeys()
    await this.saveFiles()
    const cascade = this.serializeDbValues()
    for (const row of cascade) {
      const result = await new Update()
        .target(row.model)
        .values(row.values)
        .filter({ [row.model.pkName]: this.pk })
        .exec()
      if (result && !result.changes) {
        await new Insert()
          .target(row.model)
          .values(row.values)
          .exec()
      }
    }
    return this
  }

  async save (...args) {
    await this.validate()
    if (this.pk) {
      return await this.update(...args)
    }
    return await this.create(...args)
  }

  async reload () {
    const values = await this.constructor.objects.query.mapModel(null).get({
      [this.constructor.pkName]: this.pk
    })
    this.constructor.db.Mapper.updateInstanceValues(this, values)
    return this
  }

  async delete () {
    let obj = this.constructor
    while (obj && obj !== DatabaseModel && !isAbstract(obj)) {
      await new Delete()
        .target(obj)
        .filter({ [obj.pkName]: this.pk })
        .exec()
      obj = Object.getPrototypeOf(obj)
    }
  }

  static getDatabaseFields () {
    return this.fieldObjects.filter(([key, field]) => field.db)
  }

  static getOwnDatabaseFields () {
    return parseFieldObjects(this).filter(([key, field]) => field.db)
  }

  serializeDbValues () {
    const fields = []
    let obj = this.constructor

    do {
      const values = obj.getOwnDatabaseFields().reduce(
        (aggr, [key, field]) => ({
          ...aggr,
          [key]: field.toDb(this.get(key))
        }),
        {}
      )
      if (
        fields[0] &&
        (isAbstract(obj) || this.constructor.db.mergeNestedModels)
      ) {
        fields[0].values = { ...fields[0].values, ...values }
      } else {
        fields.unshift({
          model: obj,
          values
        })
      }
      obj = Object.getPrototypeOf(obj)
    } while (obj && obj !== DatabaseModel)
    return fields
  }

  static toString () {
    return getModelName(this)
  }

  toString () {
    return `${this.constructor}#${this.pk || '(new)'}`
  }
}

module.exports = {
  DatabaseModel,
  ObjectManager
}
