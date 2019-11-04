const {boot, tearDown} = require('../../../WebTestCase')
const Conditions = require('../../../../src/BonusCondition')

const {
  createCustomer, authorizeOwner,
  createCompany, createOwner
} = require('../../../utils')

let app, staff, token, customer, company

beforeAll(async (done) => {

  app = await boot()

  const owner = await createOwner()

  company = await createCompany(owner._id, {
    bonusCondition: Conditions.BC_4_PLUS_1,
  })

  customer = await createCustomer()

  token = authorizeOwner(owner)

  done()
})

afterAll(async done => {

  await tearDown();

  app = null
  staff = null
  customer = null
  token = null

  done();
});

describe('PurchaseRESTController for Owner', () => {

  it('POST /api/v1/owner/customers/:id/purchases as Owner is successful', async (done) => {

    const res = await app.post(`/api/v1/owner/customers/${customer._id}/purchases`)
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(201)
    expect(res.body.staff).not.toBe(undefined)
    expect(res.body.customer).not.toBe(undefined)
    expect(res.body.company).not.toBe(undefined)
    expect(res.body.isBonus).toBe(false)
    expect(res.body.store).toBe(undefined)

    done()
  })

  it(`Bonus condition ${Conditions.BC_4_PLUS_1}: 4 purchases should yield 1 bonus`, async (done) => {

    const customer = await createCustomer()

    expect(company.bonusCondition).toBe(Conditions.BC_4_PLUS_1)

    for (let i = 0; i < 4; i++) {
      const resNotBonus = await app.post(`/api/v1/owner/customers/${customer._id}/purchases`)
        .set('Authorization', `${token}`)

      expect(resNotBonus.statusCode).toBe(201)
      expect(resNotBonus.body.bonusCondition).toBe(Conditions.BC_4_PLUS_1)
      expect(resNotBonus.body.isBonus).toBe(false)
    }

    const resBonus = await app.post(`/api/v1/owner/customers/${customer._id}/purchases`)
      .set('Authorization', `${token}`)

    expect(resBonus.statusCode).toBe(201)
    expect(resBonus.body.bonusCondition).toBe(Conditions.BC_4_PLUS_1)
    expect(resBonus.body.isBonus).toBe(true)

    done()
  })

  it(`Bonus condition ${Conditions.BC_4_PLUS_1}: 10 purchases in a row should yield only 2 bonuses`, async (done) => {

    const customer = await createCustomer()

    expect(company.bonusCondition).toBe(Conditions.BC_4_PLUS_1)

    for (let i = 0; i < 4; i++) {
      const resNotBonus = await app.post(`/api/v1/owner/customers/${customer._id}/purchases`)
        .set('Authorization', `${token}`)

      expect(resNotBonus.statusCode).toBe(201)
      expect(resNotBonus.body.bonusCondition).toBe(Conditions.BC_4_PLUS_1)
      expect(resNotBonus.body.isBonus).toBe(false)
    }

    const resBonus1 = await app.post(`/api/v1/owner/customers/${customer._id}/purchases`)
      .set('Authorization', `${token}`)

    expect(resBonus1.statusCode).toBe(201)
    expect(resBonus1.body.bonusCondition).toBe(Conditions.BC_4_PLUS_1)
    expect(resBonus1.body.isBonus).toBe(true)

    for (let i = 0; i < 4; i++) {
      const resNotBonus = await app.post(`/api/v1/owner/customers/${customer._id}/purchases`)
        .set('Authorization', `${token}`)

      expect(resNotBonus.statusCode).toBe(201)
      expect(resNotBonus.body.bonusCondition).toBe(Conditions.BC_4_PLUS_1)
      expect(resNotBonus.body.isBonus).toBe(false)
    }

    const resBonus2 = await app.post(`/api/v1/owner/customers/${customer._id}/purchases`)
      .set('Authorization', `${token}`)

    expect(resBonus2.statusCode).toBe(201)
    expect(resBonus2.body.bonusCondition).toBe(Conditions.BC_4_PLUS_1)
    expect(resBonus2.body.isBonus).toBe(true)

    done()
  })

})