const fields = require('djorm/fields')

const { advanceTo, clear } = require('jest-date-mock')
const { init, shutdown } = require('djorm/config')
const { DatabaseModel, clearModels, getModel } = require('djorm/models')
const { RecordIsReferenced } = require('djorm/db/errors')

const setupModels = () => {
  beforeEach(() => {
    class User extends DatabaseModel {
      static id = new fields.PositiveIntegerField()
      static name = new fields.CharField()
      static email = new fields.CharField()
      static superuser = new fields.BooleanField()
      static inactive = new fields.BooleanField()

      static meta = class {
        static modelName = 'User'
      }
    }

    class Role extends DatabaseModel {
      static id = new fields.PositiveIntegerField()
      static name = new fields.CharField()

      static meta = class {
        static modelName = 'Role'
      }
    }

    class UserRole extends DatabaseModel {
      static id = new fields.PositiveIntegerField()
      static user = new fields.ForeignKey({
        model: 'User',
        relatedName: 'userRoles'
      })

      static role = new fields.ForeignKey({
        model: 'Role',
        relatedName: 'userRoles'
      })
    }

    User.register()
    Role.register()
    UserRole.register()
  })
}

const setupTests = ({ testForeignKeys }) => {
  it('selects user roles', async () => {
    const User = getModel('User')
    const UserRole = getModel('UserRole')
    const user = await User.objects.first()
    const items = await user.rel('userRoles').all()
    expect(items).toEqual([
      new UserRole({
        id: 1,
        roleId: 1,
        userId: 1
      }),
      new UserRole({
        id: 2,
        roleId: 2,
        userId: 1
      })
    ])
  })

  it('selects distinct user roles', async () => {
    const User = getModel('User')
    const UserRole = getModel('UserRole')
    const user = await User.objects.first()
    const items = await user
      .rel('userRoles')
      .distinct()
      .all()
    expect(items).toEqual([
      new UserRole({
        id: 1,
        roleId: 1,
        userId: 1
      }),
      new UserRole({
        id: 2,
        roleId: 2,
        userId: 1
      })
    ])
  })

  if (testForeignKeys) {
    it('throws RecordIsReferenced when trying to delete referenced role', async () => {
      const role = await getModel('Role').objects.get({ id: 1 })
      await expect(role.delete()).rejects.toBeInstanceOf(RecordIsReferenced)
    })
  }
}

const setupSuite = ({ testForeignKeys = true } = {}) => {
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

  setupTests({ testForeignKeys })
}

module.exports = { setupSuite }
