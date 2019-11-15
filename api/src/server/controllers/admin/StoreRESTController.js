const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isAdmin = require('../../services/AuthService').isAdmin;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Store = require('../../../database/model/Store').Store;
const StoreRepository = require('../../../database/repository/StoreRepository');
const StoreService = require('../../services/StoreService');
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.get('/stores', isAdmin, async (req, res) => {

  try {

    let page = 1, limit = 10

    if (req.query.limit !== undefined) {
      limit = parseInt(req.query.limit)
      if (isNaN(limit) || limit < 0) limit = 10
    }

    if (req.query.page !== undefined) {
      page = parseInt(req.query.page)
      if (isNaN(page) || page < 0) page = 10
    }

    let filter = {}

    let items = []
    const total = await StoreRepository.countByFilter(filter)
    if (total > 0) {
      items = await StoreRepository.findByFilter(filter, page, limit)

      items = items.map(item => StoreService.serialize(item))
    }

    res.status(200).json({
      page,
      limit,
      total,
      count: items.length,
      items,
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.get('/stores/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await StoreRepository.findOneByFilter({
      _id: req.params.id,
    })
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    res.status(200).json(StoreService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/stores', isAdmin, async (req, res) => {

  try {

    const result = await StoreService.create({
      ...req.body,
    })

    res.status(201).json(StoreService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/stores/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await Store.findOne({
      _id: req.params.id,
    })
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    const result = await StoreService.update(entity, {
      ...req.body,
    })

    res.status(200).json(StoreService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/stores/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await StoreRepository.findOneByFilter({
      _id: req.params.id,
    })
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    await StoreService.remove(entity._id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

