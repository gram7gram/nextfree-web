const path = require('path');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const parameters = require('../../parameters');
const template = require('nunjucks');

const views = path.resolve(__dirname, '../views')

const router = new express.Router({mergeParams: true});

router.get('/', async (req, res) => {

  const {data} = await axios.get(`${parameters.apiHost}/api/v1/partner-websites?limit=6`, {
    timeout: 1000
  })

  let partners = [], totalCompanies = 0, totalStores = 0;
  if (data) {
    partners = data.items
    totalCompanies = data.totalCompanies
    totalStores = data.totalStores
  }

  const result = template.render(`${views}/index.html.twig`, {
    parameters,
    moment,
    partners,
    totalCompanies,
    totalStores,
  })

  res.send(result)
});

router.get('/login', (req, res) => {

  const result = template.render(`${views}/login.html.twig`, {
    parameters,
    moment,
  })

  res.send(result)
});

router.get('/privacy', (req, res) => {

  const result = template.render(`${views}/privacy.html.twig`, {
    parameters,
    moment,
  })

  res.send(result)
});

module.exports = router;

