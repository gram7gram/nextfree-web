const Sentry = require('@sentry/node')
const parameters = require('../parameters')
const provision = require('./provision')

const env = process.env.NODE_ENV || 'production'

if (env === 'production') {
  Sentry.init({dsn: "https://b5dbf33ef1f244bb9e93b55b22b13991@sentry.io/1831992"});
  Sentry.setExtra('domain', 'api.nextfree.com.ua')
}

console.log(`Starting app in ${env} environment...`)

process.on('unhandledRejection', (reason, p) => {
  console.error(
    "Unhandled Rejection at:\r\n"
    + "Promise:\r\n" + JSON.stringify(p)
    + "\r\nReason:\r\n" + JSON.stringify(reason)
  )

  Sentry.captureException(reason)
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