const path = require('path');
const moment = require('moment');
const axios = require('axios');
const express = require('express');
const parameters = require('../../parameters');
const template = require('../templating');
const ab = require('../middleware/ab');

const views = path.resolve(__dirname, '../views')

const router = new express.Router({mergeParams: true});

const index = async (req, res) => {

  let partners = [], totalCompanies = 0, totalStores = 0;
  try {
    const {data} = await axios.get(`${parameters.apiHost}/api/v1/partner-websites?limit=12`, {
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

  const result = template.render(`${views}/${req.abVersion}/login.html.twig`)

  res.send(result)
}

const privacy = (req, res) => {

  const result = template.render(`${views}/${req.abVersion}/privacy.html.twig`)

  res.send(result)
};

router.get('/login', ab.defaultVersion, login);
router.get('/:v/login', ab.detectVersion, login);
router.get('/privacy', ab.defaultVersion, privacy);
router.get('/:v/privacy', ab.detectVersion, privacy);
router.get('/', ab.defaultVersion, index);
router.get('/:v', ab.detectVersion, index);

module.exports = router;

