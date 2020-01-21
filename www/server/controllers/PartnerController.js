const express = require('express');
const path = require('path');
const axios = require('axios');
const template = require('../templating');
const ErrorHandler = require('../ErrorHandler');
const parameters = require('../../parameters');
const ab = require('../middleware/ab');

const views = path.resolve(__dirname, '../views')

const router = new express.Router({mergeParams: true});

const route = async (req, res) => {

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

    const result = template.render(`${views}/${req.abVersion}/partner.html.twig`, {
      bonusCondition,
      ...data
    });

    res.send(result)
  } catch (e) {
    ErrorHandler.handle(res, e)
  }
}

router.get('/partners/:id', ab.defaultVersion, route);
router.get('/:v/partners/:id', ab.detectVersion, route);

module.exports = router;

