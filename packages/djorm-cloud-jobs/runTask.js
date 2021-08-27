const { JobStatus, JobStatusHandler } = require('./models')
const { RuntimeError, formatError } = require('./errors')
const { info } = require('djorm/logger')

const resolveHandler = (handlers, job, stage) => {
  const handlerName = JobStatusHandler[stage]
  if (handlerName in handlers) {
    const handler = handlers[handlerName]
    if (handler) {
      return handler
    }
    throw new RuntimeError(`Could not find "${handlerName} for "${job.type}"`)
  }
}

const closeupParent = async (job, stage) => {
  if (job.parentId) {
    const parent = await job.rel('parent').get()
    if (parent.live) {
      await parent.fetchStats()
      const stats = parent.childStats
      if (
        stats.trigger === 0 &&
        stats.request === 0 &&
        stats.stopped === 0 &&
        stats.waiting === 0
      ) {
        info(`Calling ${parent.id} a ${stage}`)
        parent.status = stage
        await parent.save()
        await parent.spawn()
      }
    }
  }
}

/** Run a job stage
 * @async
 * @param task {Object}
 * @param task.onTrigger {Function}
 * @param task.onRequest {Function}
 * @param task.onSuccess {Function}
 * @param task.onFailure {Function}
 * @param {JobBase} job
 * @param stage {string}
 * @returns {Object}
 */
async function runStage (handlers, job, stage, ...args) {
  info(`Running Job#${job.id}:${stage}`)
  const handler = resolveHandler(handlers, job, stage)
  job.status = stage
  await job.save()
  let outputs = null
  if (handler) {
    outputs = await handler(job, ...args)
  }
  if (stage === JobStatus.success || stage === JobStatus.failure) {
    await closeupParent(job, stage)
  }
  return outputs
}

function parseJobOutput (job, outputs) {
  let result = null
  let status = null
  if (outputs instanceof Array) {
    result = outputs[0]
    status = outputs[1]
  } else {
    result = outputs
  }
  if (!status && job.childrenIds.length === 0) {
    status = JobStatus.success
  }
  return [result, status]
}

/** Run task through usual async process stages
 * @async
 * @param task {Object} Developer defined task handlers
 * @param job {JobBase}
 * @param topic {string} PubSub topic
 * @returns void
 */
async function runTask (handlers, job) {
  if (
    job.status &&
    job.status !== JobStatus.trigger &&
    job.status !== JobStatus.request
  ) {
    await runStage(handlers, job, job.status)
  } else {
    try {
      const outputs = await runStage(handlers, job, JobStatus.request)
      const [result, status] = parseJobOutput(job, outputs)
      job.output = result
      if (status) {
        await runStage(handlers, job, status)
      }
    } catch (e) {
      info(`Caught error: ${formatError(e)}`)
      await runStage(handlers, job, JobStatus.failure, e)
      // This job will be recycled instead of fulfilling (rerun request stage)
      await job.retry(e)
    }
  }
}

module.exports = {
  runStage,
  runTask
}
