const parameters = require('../parameters')
const provision = require('./provision')

console.log(`Starting app in ${process.env.NODE_ENV} environment...`)

process.on('unhandledRejection', (reason, p) => {
  console.error(
    "Unhandled Rejection at:\r\n"
    + "Promise:\r\n" + JSON.stringify(p)
    + "\r\nReason:\r\n" + JSON.stringify(reason)
  )
})

const db = require('./database/mongo');

db.connect()
  .then(provision)
  .catch(e => {
    console.error(e)
  })

const server = require('./server/express');

server.listen(parameters.port, () => {
  console.log('Server started')
})