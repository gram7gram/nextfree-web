const express = require('express');
const path = require('path');
const axios = require('axios');
const template = require('nunjucks');
const moment = require('moment');
const ErrorHandler = require('../ErrorHandler');
const parameters = require('../../parameters');
const i18n = require('../i18n').i18n;

const views = path.resolve(__dirname, '../views')

const router = new express.Router({mergeParams: true});

router.get('/partners/:id', async (req, res) => {

  try {
    const {data, status} = await axios.get(`${parameters.apiHost}/api/v1/partner-websites/${req.params.id}`)
    if (status !== 200) {
      res.status(status).json(data)
    }

    const result = template.render(`${views}/partner.html.twig`, {
      parameters,
      i18n,
      moment,
      ...data
    });

    res.send(result)
  } catch (e) {
    ErrorHandler.handle(res, e)
  }
});

module.exports = router;

