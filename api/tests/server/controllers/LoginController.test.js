const {boot, tearDown} = require('../../WebTestCase')

const {
  createCustomer, createOwner, createStaff,
  authorizeStaff, authorizeCustomer, authorizeOwner
} = require('../../utils')

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

describe('LoginController', () => {

  it('POST /api/v1/login as Customer is successful', async (done) => {

    const entity = await createCustomer()

    const res = await app.post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        email: entity.user.email,
        password: entity.user.password
      }))

    expect(res.statusCode).toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isCustomer, 'Not a Customer').toBe(true)
    expect(res.body.user, 'Missing user').not.toBe(undefined)
    expect(res.body.user.user.email).toBe(entity.user.email)

    done()
  })

  it('POST /api/v1/login as Owner is successful', async (done) => {
    const entity = await createOwner()

    const res = await app.post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        email: entity.user.email,
        password: entity.user.password
      }))

    expect(res.statusCode).toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isOwner, 'Not an Owner').toBe(true)
    expect(res.body.user, 'Missing user').not.toBe(undefined)
    expect(res.body.user.user.email).toBe(entity.user.email)

    done()
  })

  it('POST /api/v1/login as Staff is successful', async (done) => {
    const entity = await createStaff()

    const res = await app.post('/api/v1/login')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        email: entity.user.email,
        password: entity.user.password
      }))

    expect(res.statusCode).toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isStaff, 'Not a Staff').toBe(true)
    expect(res.body.user, 'Missing user').not.toBe(undefined)
    expect(res.body.user.user.email).toBe(entity.user.email)

    done()

  })

  it('POST /api/v1/login-check as Staff is successful', async (done) => {
    const entity = await createStaff()

    const token = authorizeStaff(entity)

    const res = await app.post('/api/v1/login-check')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isStaff, 'Not a Staff').toBe(true)

    done()

  })

  it('POST /api/v1/login-check as Customer is successful', async (done) => {
    const entity = await createCustomer()

    const token = authorizeCustomer(entity)

    const res = await app.post('/api/v1/login-check')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isCustomer, 'Not a Customer').toBe(true)

    done()

  })

  it('POST /api/v1/login-check as Owner is successful', async (done) => {
    const entity = await createOwner()

    const token = authorizeOwner(entity)

    const res = await app.post('/api/v1/login-check')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.token, 'Missing token').not.toBe(undefined)
    expect(res.body.isOwner, 'Not a Owner').toBe(true)

    done()

  })

})