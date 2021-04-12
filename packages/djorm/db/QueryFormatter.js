const { ComparisonOperator } = require('./ComparisonOperator')
const { QueryError } = require('./errors')

class QueryFormatter {
  filterNonEmpty = item => Boolean(item)
  operatorMatch = new RegExp(
    `__(${Object.keys(ComparisonOperator).join('|')})$`
  )

  formatValue (value) {
    if (Number.isInteger(value)) {
      return String(value)
    }
    if (typeof value === 'string') {
      return `'${value}'` // TODO: escape
    }
    throw new QueryError(
      `Unknown value type: "${typeof value}" for value "${value}"`
    )
  }
}

module.exports = { QueryFormatter }
