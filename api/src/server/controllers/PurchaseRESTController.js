const express = require('express');

const ErrorHandler = require('../services/ErrorHandler');
const {isAuthenticated} = require('../services/AuthService');

const PurchaseService = require('../services/PurchaseService');
const PurchaseRepository = require('../../database/repository/PurchaseRepository');

const router = new express.Router({mergeParams: true});

router.get('/purchases', isAuthenticated, async (req, res) => {

  try {

    const buyer = {...req.currentUser.user}

    let page = 1, limit = 10

    if (req.query.limit !== undefined) {
      limit = parseInt(req.query.limit)
      if (isNaN(limit) || limit < 0) limit = 10
    }

    if (req.query.page !== undefined) {
      page = parseInt(req.query.page)
      if (isNaN(page) || page < 0) page = 10
    }

    let filter = {
      'buyer._id': buyer._id
    }

    if (req.query.filter) {
      if (req.query.filter.search) {
        filter.$or = [
          {'company.name': {$regex: req.query.filter.search, $options: 'im'}},
          {'store.address': {$regex: req.query.filter.search, $options: 'im'}},
          {'store.city': {$regex: req.query.filter.search, $options: 'im'}},
        ]
      }
    }

    let items = [], meta = []
    const total = await PurchaseRepository.countByFilter(filter)
    if (total > 0) {
      items = await PurchaseRepository.findByFilter(filter, page, limit)

      items = items.map(item => PurchaseService.serialize(item))

      meta = await PurchaseService.groupByCompany(buyer._id)
    }

    res.status(200).json({
      page,
      limit,
      total,
      count: items.length,
      items,
      meta
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

