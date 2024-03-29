const { AttrModel } = require('../../models/AttrModel')
const { DateTimeField } = require('../DateTimeField')
const { ValueError } = require('../../errors')

describe('DateTimeField', () => {
  class TestModel extends AttrModel {
    static testField = new DateTimeField()
  }

  it('accepts null value', () => {
    const instance = new TestModel({
      testField: null
    })
    expect(instance.testField).toEqual(null)
  })

  it('accepts ISO date string', () => {
    const instance = new TestModel({
      testField: '2021-05-24'
    })
    expect(instance.testField).toEqual(new Date(Date.UTC(2021, 4, 24, 0, 0, 0)))
  })

  it('accepts date object without time', () => {
    const instance = new TestModel({
      testField: new Date(Date.UTC(2021, 4, 24))
    })
    expect(instance.testField).toEqual(new Date(Date.UTC(2021, 4, 24, 0, 0, 0)))
  })

  it('accepts date object', () => {
    const instance = new TestModel({
      testField: new Date(Date.UTC(2021, 4, 24, 12, 15, 23))
    })
    expect(instance.testField).toEqual(
      new Date(Date.UTC(2021, 4, 24, 12, 15, 23))
    )
  })

  it('accepts number', () => {
    const instance = new TestModel({
      testField: Date.UTC(2021, 4, 24)
    })
    expect(instance.testField).toEqual(new Date(Date.UTC(2021, 4, 24, 0, 0, 0)))
  })

  it('serializes value as an ISO-8601 date time string', () => {
    expect(
      TestModel.testField.serialize(new Date(Date.UTC(2021, 4, 24, 12, 13, 43)))
    ).toEqual('2021-05-24T12:13:43.000Z')
  })

  it('serializes `undefined` as a `null`', () => {
    expect(TestModel.testField.serialize(undefined)).toEqual(null)
  })

  it('throws value error on invalid date', () => {
    expect(
      () =>
        new TestModel({
          testField: 'gibberish'
        })
    ).toThrow(ValueError)
  })
})
