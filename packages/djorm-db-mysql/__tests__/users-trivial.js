const hub = require('djorm/db/DatabaseHub')
const fields = require('djorm/fields')

const { advanceTo, clear } = require('jest-date-mock')
const { DatabaseModel } = require('djorm/models')
const { setupDb } = require('../__samples__/setup')
const { TargetStream } = require('__mocks__/TargetStream')

describe('mysql select with users-trivial', () => {
  let models

  setupDb('users-trivial.sql')

  beforeEach(() => {
    advanceTo(new Date(Date.UTC(2021, 4, 25, 0, 0, 0)))
  })

  beforeEach(async () => {
    class User extends DatabaseModel {
      static id = new fields.PositiveIntegerField()
      static name = new fields.CharField()
      static email = new fields.CharField()
      static superuser = new fields.BooleanField()
      static inactive = new fields.BooleanField()
      static createdAt = new fields.DateTimeField()

      static meta = class {
        static modelName = 'User'
      }

      async create () {
        this.set('createdAt', new Date())
        return super.create()
      }
    }

    User.register()
    models = { User }
  })

  afterEach(async () => {
    await hub.disconnect()
    clear()
  })

  it('selects all users', async () => {
    const result = await models.User.objects.all()
    expect(result).toEqual([
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        id: 1,
        name: 'Harmony Vasquez',
        email: 'harmony.vasquez@gmail.com',
        superuser: false,
        inactive: false
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 21, 21, 21)),
        id: 2,
        name: 'Jasper Fraley',
        email: 'jasper.fraley@seznam.cz',
        superuser: true,
        inactive: false
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 22, 22, 22)),
        id: 3,
        name: 'Neil Henry',
        email: 'neil.henry@iol.com',
        superuser: false,
        inactive: true
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 23, 23, 23)),
        id: 4,
        name: 'Merver Chin',
        email: 'merver.chin@gmail.com',
        superuser: true,
        inactive: false
      })
    ])
  })

  it('streams all users', async () => {
    const dest = new TargetStream()
    const src = await models.User.objects.stream()
    await new Promise((resolve, reject) => {
      src
        .pipe(dest)
        .on('error', reject)
        .on('finish', resolve)
    })

    expect(dest.data).toEqual([
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        id: 1,
        name: 'Harmony Vasquez',
        email: 'harmony.vasquez@gmail.com',
        superuser: false,
        inactive: false
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 21, 21, 21)),
        id: 2,
        name: 'Jasper Fraley',
        email: 'jasper.fraley@seznam.cz',
        superuser: true,
        inactive: false
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 22, 22, 22)),
        id: 3,
        name: 'Neil Henry',
        email: 'neil.henry@iol.com',
        superuser: false,
        inactive: true
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 23, 23, 23)),
        id: 4,
        name: 'Merver Chin',
        email: 'merver.chin@gmail.com',
        superuser: true,
        inactive: false
      })
    ])
  })

  it('selects all users ordered by alphabet in reverse', async () => {
    const result = await models.User.objects.orderBy('-name').all()
    expect(result).toEqual([
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 22, 22, 22)),
        id: 3,
        name: 'Neil Henry',
        email: 'neil.henry@iol.com',
        superuser: false,
        inactive: true
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 23, 23, 23)),
        id: 4,
        name: 'Merver Chin',
        email: 'merver.chin@gmail.com',
        superuser: true,
        inactive: false
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 21, 21, 21)),
        id: 2,
        name: 'Jasper Fraley',
        email: 'jasper.fraley@seznam.cz',
        superuser: true,
        inactive: false
      }),
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        id: 1,
        name: 'Harmony Vasquez',
        email: 'harmony.vasquez@gmail.com',
        superuser: false,
        inactive: false
      })
    ])
  })

  it('selects first superadmin', async () => {
    const result = await models.User.objects.filter({ superuser: true }).first()
    expect(result).toEqual(
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 21, 21, 21)),
        id: 2,
        name: 'Jasper Fraley',
        email: 'jasper.fraley@seznam.cz',
        superuser: true,
        inactive: false
      })
    )
  })

  it('selects last superadmin', async () => {
    const result = await models.User.objects.filter({ superuser: true }).last()
    expect(result).toEqual(
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 23, 23, 23)),
        id: 4,
        name: 'Merver Chin',
        email: 'merver.chin@gmail.com',
        superuser: true,
        inactive: false
      })
    )
  })

  it('inserts user', async () => {
    const user = new models.User({
      name: 'Test Runner',
      email: 'test.runner@gmail.com',
      superuser: false,
      inactive: false
    })
    await user.save()
    expect(
      await models.User.objects.filter({ name: 'Test Runner' }).first()
    ).toEqual(
      new models.User({
        createdAt: new Date(Date.UTC(2021, 4, 25, 0, 0, 0)),
        id: 5,
        name: 'Test Runner',
        email: 'test.runner@gmail.com',
        superuser: false,
        inactive: false
      })
    )
  })

  it('updates new user object primary key', async () => {
    const user = new models.User({
      name: 'John Runner',
      email: 'test.runner@gmail.com',
      superuser: false,
      inactive: false
    })
    await user.save()
    expect(user.pk).not.toBe(null)
    expect(user.pk).not.toBe(undefined)
    expect(typeof user.pk).toBe('number')
  })

  it('deletes user', async () => {
    const user = await models.User.objects.get({ id: 1 })
    await user.delete()
    expect(await models.User.objects.filter({ id: 1 }).first()).toEqual(null)
  })

  it('updates user', async () => {
    const user = await models.User.objects.get({ id: 1 })
    user.name = 'Test Runner 2'
    await user.save()
    expect(await models.User.objects.filter({ id: 1 }).first()).toEqual(
      new models.User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        id: 1,
        name: 'Test Runner 2',
        email: 'harmony.vasquez@gmail.com',
        superuser: false,
        inactive: false
      })
    )
  })

  it('counts users', async () => {
    expect(await models.User.objects.count()).toBe(4)
  })
})
