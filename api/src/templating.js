const templating = require('nunjucks')

templating.configure(__dirname + '/templates', {
  autoescape: true,
});

module.exports = templating