const {boot, tearDown} = require('../../../WebTestCase')

const Customer = require('../../../../src/database/model/Customer').Customer
const {createCustomer, authorizeCustomer, cid} = require('../../../utils')

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

describe('ProfileController for Customer', () => {

  it('POST /api/v1/customer/profile as Customer is successful', async (done) => {

    const entity = await createCustomer()

    const token = authorizeCustomer(entity)

    const newName = cid()

    const res = await app.post('/api/v1/customer/profile')
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        user: {
          firstName: newName
        }
      }))

    expect(res.statusCode).toBe(200)
    expect(res.body.user.firstName).toBe(newName)

    await Customer.deleteOne({_id: entity._id})

    done()
  })

  it('GET /api/v1/customer/profile as Customer is successful', async (done) => {

    const entity = await createCustomer()

    const token = authorizeCustomer(entity)

    const res = await app.get('/api/v1/customer/profile')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body._id + "").toBe(entity._id + "")

    await Customer.deleteOne({_id: entity._id})

    done()
  })

})