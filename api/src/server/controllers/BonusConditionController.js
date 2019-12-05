const express = require('express');
const isAuthenticated = require('../services/AuthService').isAuthenticated;
const i18n = require('../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.get('/bonus-conditions', isAuthenticated, async (req, res) => {

  const items = [
    {
      code: '4+1',
      title: i18n.t('bonus_conditions.4+1.title'),
      description: i18n.t('bonus_conditions.4+1.description'),
    },
    {
      code: '5+1',
      title: i18n.t('bonus_conditions.5+1.title'),
      description: i18n.t('bonus_conditions.5+1.description'),
    }
  ]

  res.status(200).json({
    count: items.length,
    items
  })
})

module.exports = router;

