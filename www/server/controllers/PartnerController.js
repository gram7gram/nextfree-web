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

    let bonusCondition = null

    const bonusResponse = await axios.get(`${parameters.apiHost}/api/v1/bonus-conditions`)
    if (bonusResponse.status === 200) {
      bonusCondition = bonusResponse.data.items.find(item =>
        item.code === data.company.bonusCondition
      )
    }

    const result = template.render(`${views}/partner.html.twig`, {
      parameters,
      i18n,
      moment,
      bonusCondition,
      ...data
    });

    res.send(result)
  } catch (e) {
    ErrorHandler.handle(res, e)
  }
});

module.exports = router;

