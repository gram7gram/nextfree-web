const express = require('express');
const i18n = require('../../i18n').i18n;
const BonusCondition = require('../../BonusCondition');

const router = new express.Router({mergeParams: true});

router.get('/bonus-conditions', async (req, res) => {

  const items = [
    {
      code: BonusCondition.BC_4_PLUS_1,
      title: i18n.t('bonus_conditions.4+1.title'),
      description: i18n.t('bonus_conditions.4+1.description'),
    },
    {
      code: BonusCondition.BC_5_PLUS_1,
      title: i18n.t('bonus_conditions.5+1.title'),
      description: i18n.t('bonus_conditions.5+1.description'),
    },
    {
      code: BonusCondition.BC_6_PLUS_1,
      title: i18n.t('bonus_conditions.6+1.title'),
      description: i18n.t('bonus_conditions.6+1.description'),
    },
    {
      code: BonusCondition.BC_7_PLUS_1,
      title: i18n.t('bonus_conditions.7+1.title'),
      description: i18n.t('bonus_conditions.7+1.description'),
    },
    {
      code: BonusCondition.BC_9_PLUS_1,
      title: i18n.t('bonus_conditions.9+1.title'),
      description: i18n.t('bonus_conditions.9+1.description'),
    }
  ]

  res.status(200).json({
    count: items.length,
    items
  })
})

module.exports = router;

