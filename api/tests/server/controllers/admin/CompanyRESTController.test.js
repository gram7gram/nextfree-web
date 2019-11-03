const {boot, tearDown} = require('../../../WebTestCase')

const Company = require('../../../../src/database/model/Company').Company
const Owner = require('../../../../src/database/model/Owner').Owner
const {createOwner, authorizeOwner, cid, createCompany} = require('../../../utils')

let app, admin, token

beforeAll(async (done) => {

  app = await boot()

  admin = await createOwner(true)

  token = authorizeOwner(admin)

  done()
})

afterAll(async done => {

  await Owner.deleteOne(admin)

  await tearDown();

  app = null
  admin = null
  token = null

  done();
});

describe('CompanyRESTController for Admin', () => {

  it('POST /api/v1/admin/companies as Admin is successful', async (done) => {

    const entity = {
      ownerId: admin._id,
      isEnabled: true,
      bonusCondition: cid(),
      name: cid(),
    }

    const res = await app.post('/api/v1/admin/companies')
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode).toBe(201)
    expect(res.body._id).not.toBe(undefined)

    await Company.deleteOne({_id: res.body._id})

    done()
  })

  it('PUT /api/v1/admin/companies/:id as Admin is successful', async (done) => {

    const entity = await createCompany(admin._id)

    const newName = cid(10)

    const res = await app.put(`/api/v1/admin/companies/${entity._id}`)
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        name: newName
      }))

    expect(res.statusCode).toBe(200)
    expect(res.body._id + "").toBe(entity._id + "")
    expect(res.body.name + "").toBe(newName)

    await Company.deleteOne({_id: entity._id})

    done()
  })

  it('DELETE /api/v1/admin/companies/:id as Admin is successful', async (done) => {

    const entity = await createCompany(admin._id)

    const res = await app.del(`/api/v1/admin/companies/${entity._id}`)
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(204)

    await Company.deleteOne({_id: entity._id})

    done()
  })

  it('GET /api/v1/admin/companies as Admin is successful', async (done) => {

    const res = await app.get('/api/v1/admin/companies')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.items).not.toBe(undefined)
    expect(res.body.count).not.toBe(undefined)
    expect(res.body.page).toBe(1)
    expect(res.body.limit).toBe(10)

    done()
  })

  it('GET /api/v1/admin/companies?page=100&limit=100 as Admin is successful', async (done) => {

    const res = await app.get('/api/v1/admin/companies?page=100&limit=100')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.page).toBe(100)
    expect(res.body.limit).toBe(100)

    done()
  })

  it('GET /api/v1/admin/companies?page=0&limit=0 as Admin is successful', async (done) => {

    const res = await app.get('/api/v1/admin/companies?page=0&limit=0')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.page).toBe(0)
    expect(res.body.limit).toBe(0)

    done()
  })

})