const {boot, tearDown} = require('../../../WebTestCase')

const Staff = require('../../../../src/database/model/Staff').Staff
const {createStaff, authorizeStaff, cid} = require('../../../utils')

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

describe('ProfileController for Staff', () => {

  it('POST /api/v1/staff/profile as Staff is successful', async (done) => {

    const entity = await createStaff()

    const token = authorizeStaff(entity)

    const newPosition = cid(), newName = cid()

    const res = await app.post('/api/v1/staff/profile')
      .set('Authorization', `${token}`)
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({
        position: newPosition,
        user: {
          firstName: newName
        }
      }))

    expect(res.statusCode).toBe(200)
    expect(res.body.position).toBe(newPosition)
    expect(res.body.user.firstName).toBe(newName)

    await Staff.deleteOne({_id: entity._id})

    done()
  })

  it('GET /api/v1/staff/profile as Staff is successful', async (done) => {

    const entity = await createStaff()

    const token = authorizeStaff(entity)

    const res = await app.get('/api/v1/staff/profile')
      .set('Authorization', `${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body._id + "").toBe(entity._id + "")

    await Staff.deleteOne({_id: entity._id})

    done()
  })

})