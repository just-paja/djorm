const { Database } = require('djorm/db/Database')
const { SqliteFormatter } = require('./SqliteFormatter')
const { SqliteReader } = require('./SqliteReader')
const { SqliteParser } = require('./SqliteParser')
const { SqliteWriter } = require('./SqliteWriter')

const errors = require('djorm/db/errors')
const sqlite = require('better-sqlite3')

class SqliteDatabase extends Database {
  formatter = new SqliteFormatter()
  parser = new SqliteParser()
  db = null

  errorCodeMap = {
    SQLITE_CONSTRAINT_FOREIGNKEY: errors.RecordIsReferenced
  }

  get path () {
    return this.props.path
  }

  createWriteStream (model) {
    return new SqliteWriter(this, model)
  }

  createDb () {
    const db = sqlite(this.path)
    if (this.props.unsafeMode) {
      db.unsafeMode(true)
    }
    db.pragma('journal_mode = WAL')
    return db
  }

  async connectDb () {
    this.db = this.createDb()
  }

  async disconnectDb () {
    this.db?.close()
    this.db = null
  }

  async execDb (str) {
    return await this.runDatabaseOperation(() => {
      const result = this.db.prepare(str).run()
      return {
        ...result,
        changes: result.changes,
        insertId: result.lastInsertRowid
      }
    })
  }

  async queryDb (str) {
    return await this.runDatabaseOperation(() => this.db.prepare(str).all())
  }

  resolveErrorType (e) {
    return e && this.errorCodeMap[e.code]
  }

  retypeError (e, ErrorType) {
    const typed = new ErrorType(e.message)
    typed.stack = e.stack
    return typed
  }

  formatQuery (qs) {
    return this.formatter.formatQuery(qs)
  }

  streamDb (qs) {
    return new SqliteReader(this, this.formatQuery(qs))
  }
}

module.exports = SqliteDatabase
