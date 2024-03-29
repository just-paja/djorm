const path = require('path')

const { error, debug } = require('djorm/logger')
const { formatMessage } = require('./pubsub')
const { getEntrypoint } = require('./entry')
const { pool } = require('workerpool')
const { getSettings } = require('djorm/config')

/** Run the job as a cascade of workers in a pool.
 *
 * @async
 * @param {string} topic
 * @param {Object} message
 * @return void
 */
const runPoolJob = async (topic, message) => {
  const entry = getEntrypoint(topic)
  const poolPath = path.join(__dirname, 'localJob.js')
  const jobPool = pool(poolPath)
  await jobPool
    .exec('runJob', [entry, { data: formatMessage(message) }])
    .catch(e => {
      error(e)
      error(e.stdout)
      error(e.stderr)
    })
  jobPool.terminate()
}

const getMod = async modPath => {
  try {
    return require(modPath)
  } catch (e) {
    return await import(modPath)
  }
}

/** Run the job in local environment
 *
 * @async
 * @param {string} topic Job topic
 * @param {Object} message Serialized job instance
 * @return void
 */
const runLocalJob = async (topic, message) => {
  debug(`SPAWN: ${topic}: ${JSON.stringify(message)}`)
  if (getSettings('cloudJobs.pool', process.env.NODE_ENV !== 'test')) {
    return await runPoolJob(topic, message)
  }
  const entryPoint = getEntrypoint(topic)
  if (!entryPoint) {
    throw new Error(`Cannot find entrypoint for topic ${topic}`)
  }
  const mod = await getMod(entryPoint)
  return await mod.runJob({
    data: formatMessage(message)
  })
}

module.exports = {
  runLocalJob
}
