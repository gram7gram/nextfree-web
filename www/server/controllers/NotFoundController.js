const path = require('path');
const template = require('../templating');
const ab = require('../middleware/ab');

const views = path.resolve(__dirname, '../views')

const route = (req, res) => {
  console.log('404');

  const result = template.render(`${views}/${req.abVersion}/404.html.twig`)

  res.send(result)
};

module.exports = router => {

  router.get('/:v/*', ab.detectVersion, route);
  router.get('/*', ab.defaultVersion, route);

};

