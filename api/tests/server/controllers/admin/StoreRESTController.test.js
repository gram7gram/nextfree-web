const {boot, tearDown} = require('../../../WebTestCase')

const Store = require('../../../../src/database/model/Store').Store
const Company = require('../../../../src/database/model/Company').Company
const Owner = require('../../../../src/database/model/Owner').Owner
const {createOwner, authorizeOwner, cid, createCompany, createStore} = require('../../../utils')

let app, admin, token, company

beforeAll(async (done) => {

  app = await boot()

  admin = await createOwner(true)

  token = authorizeOwner(admin)

  company = await createCompany(admin._id)

  done()
})

afterAll(async done => {

  await Owner.deleteOne(admin)
  await Company.deleteOne(company)

  await tearDown();

  app = null
  admin = null
  token = null
  company = null

  done();
});

describe('StoreRESTController for Admin', () => {

  it('POST /api/v1/admin/stores as Admin is successful', async (done) => {

    const entity = {
      companyId: company._id,
      isEnabled: true,
      city: cid(),
      address: cid(),
      lng: 0,
      lat: 0,
    }

    const res = await app.post(`/api/v1/admin/stores`)
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode, JSON.stringify(res.body)).toBe(201)
    expect(res.body._id).not.toBe(undefined)
    expect(res.body.companyId + "").toBe(company._id + "")

    await Store.deleteOne({_id: res.body._id})

    done()
  })

  it('PUT /api/v1/admin/stores/:id as Admin is successful', async (done) => {

    const entity = await createStore(company._id)

    const newAddress = cid(10)

    const res = await app.put(`/api/v1/admin/stores/${entity._id}`)
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        address: newAddress
      }))

    expect(res.statusCode, JSON.stringify(res.body)).toBe(200)
    expect(res.body._id + "").toBe(entity._id + "")
    expect(res.body.address + "").toBe(newAddress)

    await Store.deleteOne({_id: entity._id})

    done()
  })

  it('DELETE /api/v1/admin/stores/:id as Admin is successful', async (done) => {

    const entity = await createStore(company._id)

    const res = await app.del(`/api/v1/admin/stores/${entity._id}`)
      .set('Authorization', `${token}`)

    expect(res.statusCode, JSON.stringify(res.body)).toBe(204)

    await Store.deleteOne({_id: entity._id})

    done()
  })

  it('GET /api/v1/admin/stores as Admin is successful', async (done) => {

    const res = await app.get(`/api/v1/admin/stores`)
      .set('Authorization', `${token}`)

    expect(res.statusCode, JSON.stringify(res.body)).toBe(200)
    expect(res.body.items).not.toBe(undefined)
    expect(res.body.count).not.toBe(undefined)
    expect(res.body.page).toBe(1)
    expect(res.body.limit).toBe(10)

    done()
  })

  it('GET /api/v1/admin/stores?page=100&limit=100 as Admin is successful', async (done) => {

    const res = await app.get(`/api/v1/admin/stores?page=100&limit=100`)
      .set('Authorization', `${token}`)

    expect(res.statusCode, JSON.stringify(res.body)).toBe(200)
    expect(res.body.page).toBe(100)
    expect(res.body.limit).toBe(100)

    done()
  })

  it('GET /api/v1/admin/stores?page=0&limit=0 as Admin is successful', async (done) => {

    const res = await app.get(`/api/v1/admin/stores?page=0&limit=0`)
      .set('Authorization', `${token}`)

    expect(res.statusCode, JSON.stringify(res.body)).toBe(200)
    expect(res.body.page).toBe(0)
    expect(res.body.limit).toBe(0)

    done()
  })

})