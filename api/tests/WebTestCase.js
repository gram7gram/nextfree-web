const supertest = require('supertest')

const db = require('../src/database/mongo')
const server = require('../src')


module.exports = {
  tearDown: async () => {

    await db.disconnect()

  },
  boot: async () => {

    await db.connect()

    return supertest(server)
  }
}