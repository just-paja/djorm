const { Database } = require('djorm/db/Database')
const { DatastoreMapper } = require('./DatastoreMapper')
const { DatastoreFormatter } = require('./DatastoreFormatter')
const { Datastore } = require('@google-cloud/datastore')

class DatastoreDatabase extends Database {
  db = null
  Mapper = DatastoreMapper
  Formatter = DatastoreFormatter

  get config () {
    return {
      apiEndpoint: this.props.apiEndpoint,
      namespace: this.namespace,
      projectId: this.props.projectId,
      credentials: {
        client_email: this.props.username,
        private_key: this.props.password
      }
    }
  }

  get namespace () {
    return this.props.namespace
  }

  async connectDb () {
    this.db = new Datastore(this.config)
  }

  async disconnectDb () {
    this.db = null
  }

  async execDb (query) {
    return await query()
  }

  async queryDb (configureQuery) {
    const query = configureQuery()
    const [result] = await this.db.runQuery(query)
    return query.postprocess ? query.postprocess(result) : result
  }

  formatQuery (qs) {
    return new this.Formatter(this).formatQuery(qs)
  }

  streamDb (qs) {
    const createQuery = this.formatQuery(qs)
    return createQuery().runStream()
  }
}

module.exports = DatastoreDatabase
