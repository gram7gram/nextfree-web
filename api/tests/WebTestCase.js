const supertest = require('supertest')

const db = require('../src/database/mongo')
const server = require('../src')

module.exports = {
  tearDown: async () => {

    db.dropdb();

    await db.disconnect()

  },
  boot: async () => {

    await db.connect()

    db.dropdb();

    return supertest(server)
  }
}