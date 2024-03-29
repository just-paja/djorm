const fields = require('djorm/fields')

const { advanceTo, clear } = require('jest-date-mock')
const { DatabaseModel, clearModels, getModel } = require('djorm/models')
const { init, shutdown } = require('djorm/config')
const { serialize } = require('djorm/filters')

const setupModels = () => {
  beforeEach(() => {
    class User extends DatabaseModel {
      static id = new fields.AutoField()
      static name = new fields.CharField()
      static email = new fields.CharField()
      static superuser = new fields.BooleanField({ default: false })
      static inactive = new fields.BooleanField({ default: false })
      static rating = new fields.FloatField({ default: 0 })
      static createdAt = new fields.DateTimeField({ default: () => new Date() })
      static updatedAt = new fields.DateTimeField({ null: true })

      static meta = class {
        static modelName = 'User'
      }
    }

    User.register()
  })
}

const setupTests = () => {
  it('selects all users', async () => {
    const result = await getModel('User').objects.all()
    const User = getModel('User')
    expect(result).toEqual([
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 1,
        name: 'Harmony Vasquez',
        email: 'harmony.vasquez@gmail.com',
        rating: 5,
        superuser: false,
        inactive: false
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 21, 21, 21)),
        updatedAt: null,
        id: 2,
        name: 'Jasper Fraley',
        email: 'jasper.fraley@seznam.cz',
        rating: 3.5,
        superuser: true,
        inactive: false
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 22, 22, 22)),
        updatedAt: null,
        id: 3,
        name: 'Neil Henry',
        email: 'neil.henry@iol.com',
        rating: 1,
        superuser: false,
        inactive: true
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 23, 23, 23)),
        updatedAt: null,
        id: 4,
        name: 'Merver Chin',
        email: 'merver.chin@gmail.com',
        rating: 2.75,
        superuser: true,
        inactive: false
      })
    ])
  })

  it('selects all users ordered by alphabet in reverse', async () => {
    const User = getModel('User')
    const result = await getModel('User')
      .objects.orderBy('-name')
      .all()
    expect(result).toEqual([
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 22, 22, 22)),
        updatedAt: null,
        id: 3,
        name: 'Neil Henry',
        email: 'neil.henry@iol.com',
        rating: 1,
        superuser: false,
        inactive: true
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 23, 23, 23)),
        updatedAt: null,
        id: 4,
        name: 'Merver Chin',
        email: 'merver.chin@gmail.com',
        rating: 2.75,
        superuser: true,
        inactive: false
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 21, 21, 21)),
        updatedAt: null,
        id: 2,
        name: 'Jasper Fraley',
        email: 'jasper.fraley@seznam.cz',
        rating: 3.5,
        superuser: true,
        inactive: false
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 1,
        name: 'Harmony Vasquez',
        email: 'harmony.vasquez@gmail.com',
        rating: 5,
        superuser: false,
        inactive: false
      })
    ])
  })

  it('selects first superadmin', async () => {
    const User = getModel('User')
    const result = await User.objects.filter({ superuser: true }).first()
    expect(result).toEqual(
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 21, 21, 21)),
        updatedAt: null,
        id: 2,
        name: 'Jasper Fraley',
        email: 'jasper.fraley@seznam.cz',
        rating: 3.5,
        superuser: true,
        inactive: false
      })
    )
  })

  it('selects last superadmin', async () => {
    const User = getModel('User')
    const result = await User.objects.filter({ superuser: true }).last()
    expect(result).toEqual(
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 23, 23, 23)),
        updatedAt: null,
        id: 4,
        name: 'Merver Chin',
        email: 'merver.chin@gmail.com',
        rating: 2.75,
        superuser: true,
        inactive: false
      })
    )
  })

  it('inserts user', async () => {
    const User = getModel('User')
    const user = new User({
      name: 'Test Runner',
      email: 'test.runner@gmail.com',
      rating: 0,
      superuser: false,
      inactive: false
    })
    await user.save()
    expect(
      serialize(await User.objects.filter({ name: 'Test Runner' }).first())
    ).toEqual({
      createdAt: '2021-05-25T00:00:00.000Z',
      updatedAt: null,
      id: expect.anything(),
      name: 'Test Runner',
      email: 'test.runner@gmail.com',
      rating: 0,
      superuser: false,
      inactive: false
    })
  })

  const evilNames = [
    // Backtick terminates query and double dash comments out the rest of the query
    'This` or 1=1;--',
    // Single quote can terminate value mantinels
    "admin' --",
    // Some common bypasses
    "admin'/*",
    "' or 1=1--",
    "' or 1=1#",
    "' or 1=1/*",
    "') or '1'='1--",
    "') or ('1'='1--",
    // Backslashes are always a problem
    '\\\\\\',
    // Number sign can comment out query in MySQL
    '`; DROP user; #'
  ]

  for (const evilName of evilNames) {
    it(`inserts user named "${evilName}"`, async () => {
      const User = getModel('User')
      const user = new User({
        name: evilName,
        email: 'test@gmail.com'
      })
      await user.save()
      expect(
        serialize(await User.objects.get({ name: evilName }))
      ).toHaveProperty('name', evilName)
    })
  }

  it('updates new user object primary key', async () => {
    const User = getModel('User')
    const user = new User({
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
    const user = await getModel('User').objects.get({ id: 1 })
    await user.delete()
    expect(
      await getModel('User')
        .objects.filter({ id: 1 })
        .first()
    ).toEqual(null)
  })

  it('updates user', async () => {
    const User = getModel('User')
    const user = await User.objects.get({ id: 1 })
    user.name = 'Test Runner 2'
    await user.save()
    expect(await User.objects.filter({ id: 1 }).first()).toEqual(
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 1,
        name: 'Test Runner 2',
        email: 'harmony.vasquez@gmail.com',
        rating: 5,
        superuser: false,
        inactive: false
      })
    )
  })

  it('reloads user values', async () => {
    const User = getModel('User')
    const user = new User({ id: 1 })
    await user.reload()
    expect(user).toEqual(
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 1,
        name: 'Harmony Vasquez',
        email: 'harmony.vasquez@gmail.com',
        rating: 5,
        superuser: false,
        inactive: false
      })
    )
  })

  it('counts users', async () => {
    expect(await getModel('User').objects.count()).toBe(4)
  })

  it('creates user with predefined primary key', async () => {
    const User = getModel('User')
    const user = new User({
      createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
      id: 42,
      name: 'Elzar Jetpack',
      email: 'elzar@gmail.com',
      rating: 0,
      superuser: false,
      inactive: false
    })
    await user.save()
    expect(await User.objects.all()).toContainEqual(
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 42,
        name: 'Elzar Jetpack',
        email: 'elzar@gmail.com',
        rating: 0,
        superuser: false,
        inactive: false
      })
    )
  })

  it('updates existing user with predefined primary key', async () => {
    const User = getModel('User')
    const user = new User({
      createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
      id: 1,
      name: 'Elzar Jetpack',
      email: 'elzar@gmail.com',
      rating: 5,
      superuser: false,
      inactive: false
    })
    await user.save()
    expect(await User.objects.all()).toContainEqual(
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 1,
        name: 'Elzar Jetpack',
        email: 'elzar@gmail.com',
        rating: 5,
        superuser: false,
        inactive: false
      })
    )
  })

  it('stores double apostrophe value', async () => {
    const User = getModel('User')
    const user = await User.objects.get({ id: 1 })
    user.name = "Elzar '' Jetpack"
    await user.save()
    expect(await User.objects.all()).toContainEqual(
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 1,
        name: "Elzar '' Jetpack",
        email: 'harmony.vasquez@gmail.com',
        rating: 5,
        superuser: false,
        inactive: false
      })
    )
  })

  it('stores double value with percnts', async () => {
    const User = getModel('User')
    const user = await User.objects.get({ id: 1 })
    user.name = "Elzar '#$%^&*( Jetpack"
    await user.save()
    expect(await User.objects.all()).toContainEqual(
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 1,
        name: "Elzar '#$%^&*( Jetpack",
        email: 'harmony.vasquez@gmail.com',
        rating: 5,
        superuser: false,
        inactive: false
      })
    )
  })

  it('filters by null', async () => {
    const User = getModel('User')
    expect(
      await User.objects.filter({ updatedAt__isnull: true }).all()
    ).toEqual([
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 20, 20, 20)),
        updatedAt: null,
        id: 1,
        name: 'Harmony Vasquez',
        email: 'harmony.vasquez@gmail.com',
        rating: 5,
        superuser: false,
        inactive: false
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 21, 21, 21)),
        updatedAt: null,
        id: 2,
        name: 'Jasper Fraley',
        email: 'jasper.fraley@seznam.cz',
        rating: 3.5,

        superuser: true,
        inactive: false
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 22, 22, 22)),
        updatedAt: null,
        id: 3,
        name: 'Neil Henry',
        email: 'neil.henry@iol.com',
        rating: 1,
        superuser: false,
        inactive: true
      }),
      new User({
        createdAt: new Date(Date.UTC(2020, 0, 1, 23, 23, 23)),
        updatedAt: null,
        id: 4,
        name: 'Merver Chin',
        email: 'merver.chin@gmail.com',
        rating: 2.75,
        superuser: true,
        inactive: false
      })
    ])
  })
}

const setupSuite = () => {
  beforeEach(() => {
    advanceTo(new Date(Date.UTC(2021, 4, 25, 0, 0, 0)))
  })

  setupModels()

  beforeEach(init)

  afterEach(shutdown)

  afterEach(async () => {
    clearModels()
    clear()
  })

  setupTests()
}

module.exports = { setupSuite }
