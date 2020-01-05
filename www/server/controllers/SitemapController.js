const path = require('path');
const axios = require('axios');
const express = require('express');
const template = require('nunjucks');
const parameters = require('../../parameters');
const ErrorHandler = require('../ErrorHandler');

const views = path.resolve(__dirname, '../views')

const router = new express.Router({mergeParams: true});

router.get('/sitemap.xml', async (req, res) => {

  try {

    let routes = ['/', '/login', '/privacy']

    const response = await axios.get(`${parameters.apiHost}/api/v1/partner-websites?limit=0`)
    if (response.status === 200) {
      routes = routes.concat(response.data.items.map(website =>
        `/partners/${website._id}`
      ))
    }

    const result = template.render(`${views}/sitemap.xml.twig`, {
      parameters,
      routes
    });

    res.send(result)
  } catch (e) {
    ErrorHandler.handle(res, e);
  }
});

module.exports = router;

