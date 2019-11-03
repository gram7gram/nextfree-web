const {boot, tearDown} = require('../../../WebTestCase')

const Staff = require('../../../../src/database/model/Staff').Staff
const Store = require('../../../../src/database/model/Store').Store
const Company = require('../../../../src/database/model/Company').Company
const Owner = require('../../../../src/database/model/Owner').Owner
const {createOwner, authorizeOwner, cid, createCompany, createStore, createStaff} = require('../../../utils')

let app, owner, token, company, store

beforeAll(async (done) => {

  app = await boot()

  owner = await createOwner()

  token = authorizeOwner(owner)

  company = await createCompany(owner._id)

  store = await createStore(company._id)

  done()
})

afterAll(async done => {

  await Owner.deleteOne(owner)
  await Company.deleteOne(company)
  await Store.deleteOne(store)

  await tearDown();

  app = null
  owner = null
  token = null
  company = null
  store = null

  done();
});

describe('StaffRESTController for Owner', () => {

  it('POST /api/v1/owner/companies/:id/staff as Owner is successful', async (done) => {

    const entity = {
      companyId: company._id,
      storeId: store._id,
      position: cid(),
      user: {
        email: cid(),
        password: cid(),
      },
      isEnabled: true
    }

    const res = await app.post(`/api/v1/owner/companies/${company._id}/staff`)
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(entity))

    expect(res.statusCode, JSON.stringify(res.body)).toBe(201)
    expect(res.body._id).not.toBe(undefined)
    expect(res.body.companyId + "").toBe(company._id + "")
    expect(res.body.storeId + "").toBe(store._id + "")
    expect(res.body.position).toBe(entity.position)

    await Staff.deleteOne({_id: res.body._id})

    done()
  })

  it('PUT /api/v1/owner/companies/:id/staff/:id as Owner is successful', async (done) => {

    const entity = await createStaff()

    const res = await app.put(`/api/v1/owner/companies/${company._id}/staff/${entity._id}`)
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        storeId: store._id,
        isEnabled: false
      }))

    expect(res.statusCode, JSON.stringify(res.body)).toBe(200)
    expect(res.body._id + "").toBe(entity._id + "")
    expect(res.body.storeId + "").toBe(store._id + "")
    expect(res.body.isEnabled).toBe(false)

    await Staff.deleteOne({_id: entity._id})

    done()
  })

  it('DELETE /api/v1/owner/companies/:id/staff/:id as Owner is successful', async (done) => {

    const entity = await createStaff()

    const res = await app.del(`/api/v1/owner/companies/${company._id}/staff/${entity._id}`)
      .set('Authorization', `${token}`)

    expect(res.statusCode, JSON.stringify(res.body)).toBe(204)

    await Staff.deleteOne({_id: entity._id})

    done()
  })

  it('GET /api/v1/owner/companies/:id/staff as Owner is successful', async (done) => {

    const res = await app.get(`/api/v1/owner/companies/${company._id}/staff`)
      .set('Authorization', `${token}`)

    expect(res.statusCode, JSON.stringify(res.body)).toBe(200)
    expect(res.body.items).not.toBe(undefined)
    expect(res.body.count).not.toBe(undefined)
    expect(res.body.page).toBe(1)
    expect(res.body.limit).toBe(10)

    done()
  })

  it('GET /api/v1/owner/companies/:id/staff?page=100&limit=100 as Owner is successful', async (done) => {

    const res = await app.get(`/api/v1/owner/companies/${company._id}/staff?page=100&limit=100`)
      .set('Authorization', `${token}`)

    expect(res.statusCode, JSON.stringify(res.body)).toBe(200)
    expect(res.body.page).toBe(100)
    expect(res.body.limit).toBe(100)

    done()
  })

  it('GET /api/v1/owner/companies/:id/staff?page=0&limit=0 as Owner is successful', async (done) => {

    const res = await app.get(`/api/v1/owner/companies/${company._id}/staff?page=0&limit=0`)
      .set('Authorization', `${token}`)

    expect(res.statusCode, JSON.stringify(res.body)).toBe(200)
    expect(res.body.page).toBe(0)
    expect(res.body.limit).toBe(0)

    done()
  })

})