const {boot, tearDown} = require('../../WebTestCase')

const Customer = require('../../../src/database/model/Customer').Customer
const Owner = require('../../../src/database/model/Owner').Owner
const Staff = require('../../../src/database/model/Staff').Staff

const {cid, createCustomer, createStaff, createOwner} = require('../../utils')

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

describe('RegisterController', () => {

  it('Duplicate email for Customer is forbidden', async (done) => {

    const entity1 = await createCustomer()

    const entity = {
      user: {
        email: entity1.user.email,
        password: cid(),
      },
      isEnabled: true
    }

    const res = await app.post('/api/v1/customer/register')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('There is already customer with such email')

    await Customer.deleteOne(entity1)

    done()
  })

  it('Duplicate email for Owner is forbidden', async (done) => {

    const entity1 = await createOwner()

    const entity = {
      user: {
        email: entity1.user.email,
        password: cid(),
      },
      isEnabled: true
    }

    const res = await app.post('/api/v1/owner/register')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('There is already owner with such email')

    await Owner.deleteOne(entity1)

    done()
  })

  it('Duplicate email for Staff is forbidden', async (done) => {

    const entity1 = await createStaff()

    const entity = {
      user: {
        email: entity1.user.email,
        password: cid(),
      },
      isEnabled: true
    }

    const res = await app.post('/api/v1/staff/register')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('There is already staff with such email')

    await Staff.deleteOne(entity1)

    done()
  })

  it('POST /api/v1/owner/register is successful', async (done) => {

    const password = cid(), email = cid()

    const entity = {
      user: {
        email,
        password,
      },
      isEnabled: true
    }

    const res = await app.post('/api/v1/owner/register')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode, JSON.stringify(res.body)).toBe(201)
    expect(res.body.user.email).toBe(email)
    expect(res.body.isEnabled, 'Owner is not enabled').toBe(true)

    await Owner.deleteOne({_id: res.body._id})

    done()
  })

  it('POST /api/v1/customer/register is successful', async (done) => {
    const password = cid(), email = cid()

    const entity = {
      user: {
        email,
        password,
      },
      isEnabled: true
    }

    const res = await app.post('/api/v1/customer/register')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode, JSON.stringify(res.body)).toBe(201)
    expect(res.body.user.email).toBe(email)
    expect(res.body.isEnabled, 'Customer is not enabled').toBe(true)

    await Customer.deleteOne({_id: res.body._id})

    done()
  })

  it('POST /api/v1/staff/register is successful', async (done) => {

    const password = cid(), email = cid()

    const entity = {
      user: {
        email,
        password,
      },
      isEnabled: true
    }

    const res = await app.post('/api/v1/staff/register')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode, JSON.stringify(res.body)).toBe(201)
    expect(res.body.user.email).toBe(email)
    expect(res.body.isEnabled, 'Staff is not enabled').toBe(true)

    await Staff.deleteOne({_id: res.body._id})

    done()

  })

})