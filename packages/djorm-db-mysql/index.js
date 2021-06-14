const { Database } = require('djorm/db/Database')
const { Duplex } = require('stream')
const { getSettings } = require('djorm/config')
const { SqlFormatter } = require('djorm-db-sql')

const errors = require('djorm/db/errors')

const mysql = require('mysql')

/** MySQL Read Stream that initiates the database connection once the stream
 *  is used by piping or reading.
 */
class MysqlReadStream extends Duplex {
  /**
   * @param {Database} driver
   * @param {Query} query
   */
  constructor (driver, query) {
    super({ objectMode: true })
    this.driver = driver
    this.query = query
  }

  async _read () {
    if (!this.dbStream) {
      await this.driver.waitForConnection()
      this.dbStream = this.driver.db
        .query(this.query)
        .stream()
        .pipe(this)
      this.dbStream.on('finish', () => this.push(null))
      this.dbStream.on('error', err => this.destroy(err))
    }
  }

  _write (chunk, enc, next) {
    this.push(chunk)
    next()
  }
}

const promise = async (fn, context, ...args) =>
  await new Promise((resolve, reject) => {
    fn.call(
      context,
      ...[
        ...args,
        (err, result) => {
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        }
      ]
    )
  })

class MysqlDatabase extends Database {
  formatter = new SqlFormatter()
  db = null

  errorNumberMap = {
    1216: errors.MissingForeignKeyReference,
    1217: errors.RecordIsReferenced,
    1451: errors.RecordIsReferenced,
    1452: errors.MissingForeignKeyReference
  }

  async connectDb () {
    this.db = mysql.createConnection({
      database: this.props.database,
      debug: getSettings('debug', false),
      host: this.props.hostname,
      password: this.props.password,
      socketPath: this.props.socketPath,
      user: this.props.username,
      port: this.props.port,
      timezone: this.props.timezone
    })
    await promise(this.db.connect, this.db)
  }

  async disconnectDb () {
    let db = this.db
    this.db = null
    await promise(db.end, db)
    db = null
  }

  async execDb (str) {
    return this.queryDb(str)
  }

  async queryDb (str) {
    try {
      return await this.runDatabaseOperation(
        async () => await promise(this.db.query, this.db, str)
      )
    } catch (e) {
      if (e.fatal) {
        this.reconnect()
      }
      throw e
    }
  }

  formatQuery (qs) {
    return this.formatter.formatQuery(qs)
  }

  streamDb (qs) {
    return new MysqlReadStream(this, this.formatQuery(qs))
  }

  resolveErrorType (e) {
    return e && this.errorNumberMap[e.errno]
  }

  retypeError (err, ErrorType) {
    const typed = new ErrorType(err.message)
    typed.code = err.code
    typed.errno = err.errno
    typed.sqlMessage = err.sqlMessage
    typed.sqlState = err.sqlState
    typed.stack = err.stack
    return typed
  }
}

module.exports = MysqlDatabase
