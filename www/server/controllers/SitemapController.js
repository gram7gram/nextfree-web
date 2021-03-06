const path = require('path');
const axios = require('axios');
const moment = require('moment');
const template = require('nunjucks');
const parameters = require('../../parameters');
const ErrorHandler = require('../ErrorHandler');

const views = path.resolve(__dirname, '../views')

const route = async (req, res) => {

  try {

    let routes = [
      {
        url: '/',
        updatedAt: '2020-01-10'
      },
      {
        url: '/login',
        updatedAt: '2020-01-10'
      },
      {
        url: '/privacy',
        updatedAt: '2020-01-10'
      }
    ]

    const response = await axios.get(`${parameters.apiPrivateHost}/api/v1/partner-websites?limit=0`)
    if (response.status === 200) {
      routes = routes.concat(response.data.items.map(website => ({
          url: `/partners/${website._id}`,
          updatedAt: moment(website.updatedAt).format('YYYY-MM-DD'),
        })
      ))
    }

    const result = template.render(`${views}/sitemap.xml.twig`, {
      routes
    });

    res.send(result)
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
}

module.exports = router => {
  router.get('/sitemap.xml', route);
};

