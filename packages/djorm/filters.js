const { NestedValidationError, ValueError } = require('./errors')

const serialize = (obj, ...args) => {
  if (obj instanceof Array) {
    return obj.map(item => serialize(item, ...args))
  }
  return (obj && obj.toJson ? obj.toJson(...args) : obj) || null
}

const filterUnique = (item, index, src) => src.indexOf(item) === index

const throwFirstUnknownError = errors => {
  const unknownErrors = errors.filter(err => !(err instanceof ValueError))
  if (unknownErrors.length > 0) {
    throw unknownErrors[0]
  }
}

const throwValidationError = errors => {
  if (errors.length > 0) {
    throw new NestedValidationError(
      errors.reduce((aggr, err) => {
        if (err instanceof NestedValidationError) {
          return aggr.concat(err.fieldErrors)
        }
        return [...aggr, err]
      }, [])
    )
  }
}

const createValidatorRunner = validators => async args => {
  return await Promise.all(
    validators.filter(Boolean).map(async fn => {
      try {
        return await fn(...args)
      } catch (e) {
        // Return validation error instead of throwing it
        return e
      }
    })
  )
}

const concatValidators = (...validators) => {
  // Validator runner
  const runValidators = createValidatorRunner(validators)
  return async (...args) => {
    const results = await runValidators(args)
    const errors = results.filter(Boolean)
    throwFirstUnknownError(errors)
    throwValidationError(errors)
  }
}

module.exports = { concatValidators, filterUnique, serialize }
