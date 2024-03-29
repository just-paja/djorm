const { Storage: GcpStorage } = require('@google-cloud/storage')
const { Storage: DjormStorage } = require('djorm/storage/Storage')

/** Google Cloud Platform Cloud Storage driver
 * @param basePath {string} Prepend this path to all files
 * @param bucketName {string} Bucket name
 * @param clientEmail {string} The username / e-mail of the service account
 * @param privateKey {string} The full private key
 * @param projectId {string} The GCP project ID
 */
class GcpFileStorage extends DjormStorage {
  get storage () {
    return new GcpStorage(this.config)
  }

  get bucket () {
    return this.storage.bucket(this.getProp('bucketName'))
  }

  get config () {
    const config = {}
    if (this.getProp('projectId')) {
      config.projectId = this.getProp('projectId')
    }
    if (this.getProp('clientEmail') || this.getProp('privateKey')) {
      config.client_email = this.getProp('clientEmail')
      config.private_key = this.getProp('privateKey')
    }
    return config
  }

  file (filePath) {
    return this.bucket.file(filePath)
  }

  getReadStream (filePath) {
    return this.file(filePath).createReadStream()
  }

  getWriteStream (filePath) {
    return this.file(filePath).createWriteStream()
  }

  async exists (filePath) {
    const response = await this.file(filePath).exists()
    return Boolean(response[0])
  }

  async read (filePath) {
    throw new Error('Not implemented')
  }

  async readMeta (filePath) {
    const response = await this.file(filePath).getMetadata()
    return response[0]
  }

  async write (filePath, data) {
    await this.file(filePath).save(data)
  }
}

module.exports = { GcpFileStorage }
