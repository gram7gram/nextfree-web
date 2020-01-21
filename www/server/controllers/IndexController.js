const path = require('path');
const axios = require('axios');
const parameters = require('../../parameters');
const template = require('../templating');
const ab = require('../middleware/ab');

const views = path.resolve(__dirname, '../views')

const index = async (req, res) => {
  console.log('index');

  let partners = [], totalCompanies = 0, totalStores = 0;
  try {
    const {data} = await axios.get(`${parameters.apiPrivateHost}/api/v1/partner-websites?limit=12`, {
      timeout: 1000
    })

    if (data) {
      partners = data.items
      totalCompanies = data.totalCompanies
      totalStores = data.totalStores
    }
  } catch (e) {
    console.log(JSON.stringify(e));
  }

  const result = template.render(`${views}/${req.abVersion}/index.html.twig`, {
    partners,
    totalCompanies,
    totalStores,
  })

  res.send(result)
};

const login = (req, res) => {
  console.log('login');

  const result = template.render(`${views}/${req.abVersion}/login.html.twig`)

  res.send(result)
}

const privacy = (req, res) => {
  console.log('privacy');

  const result = template.render(`${views}/${req.abVersion}/privacy.html.twig`)

  res.send(result)
};

module.exports = router => {
  router.get('/:v/privacy', ab.detectVersion, privacy);
  router.get('/:v/login', ab.detectVersion, login);
  router.get('/:v', ab.detectVersion, index);

  router.get('/login', ab.defaultVersion, login);
  router.get('/privacy', ab.defaultVersion, privacy);
  router.get('/', ab.defaultVersion, index);
};

