const app = require('../__samples__/trivial-app')

const { ModelError } = require('../errors')
const {
  getModel,
  getModels,
  getRelationships
} = require('../models/ModelRegistry')

describe('env config with sqlite', () => {
  describe('with special cases', () => {
    beforeEach(app.initialize)
    beforeEach(app.shutdown)

    it('clears models on shutdown', async () => {
      expect(getModels()).toEqual({})
    })

    it('clears relationships on shutdown', async () => {
      expect(getRelationships()).toEqual({})
    })
  })

  describe('with trivial app', () => {
    beforeEach(app.initialize)

    afterEach(app.shutdown)

    it('retrieves users from database', async () => {
      const items = await app.User.objects.all()
      expect(items).toEqual([
        new app.User({
          id: 1,
          name: 'Harmony Vasquez',
          email: 'harmony.vasquez@gmail.com',
          superuser: false,
          inactive: false
        }),
        new app.User({
          id: 2,
          name: 'Jasper Fraley',
          email: 'jasper.fraley@seznam.cz',
          superuser: true,
          inactive: false
        }),
        new app.User({
          id: 3,
          name: 'Neil Henry',
          email: 'neil.henry@iol.com',
          superuser: false,
          inactive: true
        }),
        new app.User({
          id: 4,
          name: 'Merver Chin',
          email: 'merver.chin@gmail.com',
          superuser: true,
          inactive: false
        })
      ])
    })

    it('retrieves users ordered by name from database', async () => {
      const items = await app.User.objects.orderBy('-name').all()
      expect(items).toEqual([
        new app.User({
          id: 3,
          name: 'Neil Henry',
          email: 'neil.henry@iol.com',
          superuser: false,
          inactive: true
        }),
        new app.User({
          id: 4,
          name: 'Merver Chin',
          email: 'merver.chin@gmail.com',
          superuser: true,
          inactive: false
        }),
        new app.User({
          id: 2,
          name: 'Jasper Fraley',
          email: 'jasper.fraley@seznam.cz',
          superuser: true,
          inactive: false
        }),
        new app.User({
          id: 1,
          name: 'Harmony Vasquez',
          email: 'harmony.vasquez@gmail.com',
          superuser: false,
          inactive: false
        })
      ])
    })

    it('retrieves first user from the database', async () => {
      const items = await app.User.objects.first()
      expect(items).toEqual(
        new app.User({
          id: 1,
          name: 'Harmony Vasquez',
          email: 'harmony.vasquez@gmail.com',
          superuser: false,
          inactive: false
        })
      )
    })

    it('retrieves first superuser from the database', async () => {
      const items = await app.User.objects.filter({ superuser: true }).first()
      expect(items).toEqual(
        new app.User({
          id: 2,
          name: 'Jasper Fraley',
          email: 'jasper.fraley@seznam.cz',
          superuser: true,
          inactive: false
        })
      )
    })

    it('retrieves user roles from database', async () => {
      const user = await app.User.objects.get({ id: 2 })
      const userRoles = await user.rel('userRoles').all()
      expect(userRoles).toEqual([
        new app.UserRole({ id: 3, roleId: 3, userId: 2 })
      ])
    })

    it('retrieves user role details from database', async () => {
      const user = await app.User.objects.get({ id: 2 })
      const userRole = await user.rel('userRoles').first()
      const role = await userRole.rel('role').first()
      expect(role).toEqual(new app.Role({ id: 3, name: 'Admin' }))
    })

    it('throws ModelError when getting unknown Model', () => {
      expect(() => getModel('TestUnknownModel')).toThrow(ModelError)
    })

    it('inserts user', async () => {
      const user = new app.User({
        name: 'Test Runner',
        email: 'test.runner@gmail.com',
        superuser: false,
        inactive: false
      })
      await user.save()
      expect(
        await app.User.objects.filter({ name: 'Test Runner' }).first()
      ).toEqual({
        id: 5,
        name: 'Test Runner',
        email: 'test.runner@gmail.com',
        superuser: false,
        inactive: false
      })
    })

    it('deletes user role', async () => {
      const userRole = await app.UserRole.objects.get({ id: 1 })
      await userRole.delete()
      expect(await app.UserRole.objects.filter({ id: 1 }).first()).toEqual(null)
    })

    it('updates user', async () => {
      const user = await app.User.objects.get({ id: 1 })
      user.name = 'Test Runner 2'
      await user.save()
      expect(await app.User.objects.filter({ id: 1 }).first()).toEqual(
        new app.User({
          id: 1,
          name: 'Test Runner 2',
          email: 'harmony.vasquez@gmail.com',
          superuser: false,
          inactive: false
        })
      )
    })
  })
})
