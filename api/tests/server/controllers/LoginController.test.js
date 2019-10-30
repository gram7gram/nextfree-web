const {boot, tearDown} = require('../../WebTestCase')

const Customer = require('../../../src/database/model/Customer').Customer
const Owner = require('../../../src/database/model/Owner').Owner
const Staff = require('../../../src/database/model/Staff').Staff

let app

beforeAll(async (done) => {

  app = await boot()

  done()
})

afterAll(async done => {

  await tearDown();

  app = null

  done();
});

const cid = require('../../utils').cid

describe('LoginController', () => {

  it('POST /api/v1/login as Customer is successful', async (done) => {

    const password = cid(), email = cid()

    let entity = new Customer({
      user: {
        email,
        password,
      },
      isEnabled: true
    })

    await entity.save()

    const res = await app.post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        email,
        password
      }))

    expect(res.statusCode, res.body.message + '').toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isCustomer, 'Not a Customer').toBe(true)
    expect(res.body.user, 'Missing user').not.toBe(undefined)
    expect(res.body.user.user.email).toBe(email)

    await Customer.deleteOne(entity)

    done()
  })

  it('POST /api/v1/login as Owner is successful', async (done) => {
    const password = cid(), email = cid()

    let entity = new Owner({
      user: {
        email,
        password,
      },
      isEnabled: true
    })

    await entity.save()

    const res = await app.post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        email,
        password
      }))

    expect(res.statusCode, res.body.message + '').toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isOwner, 'Not a Owner').toBe(true)
    expect(res.body.user, 'Missing user').not.toBe(undefined)
    expect(res.body.user.user.email).toBe(email)

    await Owner.deleteOne(entity)

    done()
  })

  it('POST /api/v1/login as Staff is successful', async (done) => {
    const password = cid(), email = cid()

    let entity = new Staff({
      user: {
        email,
        password,
      },
      isEnabled: true
    })

    await entity.save()

    const res = await app.post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        email,
        password
      }))

    expect(res.statusCode, res.body.message + '').toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isStaff, 'Not a Staff').toBe(true)
    expect(res.body.user, 'Missing user').not.toBe(undefined)
    expect(res.body.user.user.email).toBe(email)

    await Staff.deleteOne(entity)

    done()

  })

})