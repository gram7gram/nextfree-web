const {boot, tearDown} = require('../../../WebTestCase')

const Owner = require('../../../../src/database/model/Owner').Owner
const {createOwner, authorizeOwner, cid} = require('../../../utils')

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

describe('ProfileController for Owner', () => {

  it('POST /api/v1/owner/profile as Owner is successful', async (done) => {

    const entity = await createOwner()

    const token = authorizeOwner(entity)

    const newName = cid()

    const res = await app.post('/api/v1/owner/profile')
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        user: {
          firstName: newName
        }
      }))

    expect(res.statusCode).toBe(200)
    expect(res.body.user.firstName).toBe(newName)

    await Owner.deleteOne({_id: entity._id})

    done()
  })

  it('GET /api/v1/owner/profile as Owner is successful', async (done) => {

    const entity = await createOwner()

    const token = authorizeOwner(entity)

    const res = await app.get('/api/v1/owner/profile')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body._id + "").toBe(entity._id + "")

    await Owner.deleteOne({_id: entity._id})

    done()
  })

})