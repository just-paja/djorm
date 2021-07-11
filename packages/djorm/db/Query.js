const { And } = require('./And')
const { DatabaseModelBase } = require('../models/DatabaseModelBase')
const { filterUnique } = require('../filters')
const { ImmutablePropModel } = require('./props')
const { parseFieldObjects } = require('../models/AttrModel')
const { Q } = require('./QueryCondition')
const { QueryColumnGroup } = require('./QueryColumnGroup')
const { QueryColumn } = require('./QueryColumn')
const { QueryError } = require('./errors')
const { QueryJoin } = require('./QueryJoin')
const { QueryTable } = require('./QueryTable')

const defaultConditions = () => []

class Query extends ImmutablePropModel {
  static fromDb (db) {
    return new this({ db })
  }

  get db () {
    return this.props.db || this.model.db
  }

  get model () {
    return this.getProp('model')
  }

  mapModel (value) {
    return this.setProp('model', value)
  }

  filter (props) {
    return this.initProp('conditions', defaultConditions).appendProp(
      'conditions',
      props instanceof Q ? props : new And(props)
    )
  }

  target (value) {
    if (value.prototype && value.prototype instanceof DatabaseModelBase) {
      const [selection, joins] = this.getModelFields(value)
      return this.setProp('target', value.table)
        .setProp('selection', selection, true)
        .setProp('joins', joins, true)
        .setProp('model', value, true)
    }
    return this.setProp(
      'target',
      typeof value === 'string' ? value : new QueryTable(value)
    )
  }

  parseTargetName (targetName) {
    return targetName.split('.').reverse()
  }

  parseTarget () {
    const target = this.props.target
    if (typeof target === 'string') {
      return this.parseTargetName(target)
    }
    if (target instanceof QueryTable) {
      return this.parseTargetName(target.name)
    }
    throw new QueryError(`Unknown target type: "${target}"`)
  }

  getModelFields (model) {
    const selection = []
    const joins = []
    let obj = model
    do {
      const fields = parseFieldObjects(obj).filter(([key, field]) => field.db)
      const fieldNames = fields.map(([key]) => key).filter(filterUnique)
      const last = selection[selection.length - 1]
      if (obj.meta && obj.meta.abstract && last) {
        for (const f of fieldNames) {
          last.columns.push(f)
        }
      } else {
        if (obj !== model) {
          joins.push(
            new QueryJoin({
              name: obj.table,
              alias: obj.table,
              conditions: {
                [model.pkName]: new QueryColumn({
                  source: obj.table,
                  name: obj.pkName
                })
              }
            })
          )
        }
        selection.push(
          new QueryColumnGroup({
            source: obj.table,
            columns: fieldNames
          })
        )
      }
      obj = Object.getPrototypeOf(obj)
    } while (obj && Object.getPrototypeOf(obj) !== DatabaseModelBase)
    return [selection, joins]
  }

  async exec () {
    return await this.db.exec(this.db.formatQuery(this))
  }

  async query () {
    return await this.db.query(this.db.formatQuery(this))
  }

  stream () {
    return this.db.stream(this)
  }
}

module.exports = {
  Query
}
