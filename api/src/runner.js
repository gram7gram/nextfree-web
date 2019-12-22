const Sentry = require('@sentry/node')
const parameters = require('../parameters')

const env = process.env.NODE_ENV || 'production'

if (env === 'production') {
  // Sentry.init({dsn: "https://0322a85cb1c847e7981ac15d8979f612@sentry.io/1839632"});
  Sentry.setTag('domain', 'api.nextfree.com.ua')
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
  // .then(require('./provision'))
  .then(require('./migration'))
  .catch(e => {
    console.error(e)
  })

const server = require('./server/express');

server.listen(parameters.port, () => {
  console.log('Server started')
})