const nunjucks = require('nunjucks')
const moment = require('moment')
const parameters = require('../parameters')
const i18n = require('./i18n').i18n

const env = nunjucks.configure()

env.addGlobal('parameters', parameters)
env.addGlobal('moment', moment)
env.addGlobal('i18n', i18n)

module.exports = nunjucks