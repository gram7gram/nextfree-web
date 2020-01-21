const templating = require('nunjucks')
const moment = require('moment')
const parameters = require('../parameters')
const i18n = require('./i18n').i18n

const env = templating.configure(__dirname + '/templates', {
  autoescape: true,
});

env.addGlobal('parameters', parameters)
env.addGlobal('i18n', i18n)
env.addGlobal('moment', moment)

module.exports = templating