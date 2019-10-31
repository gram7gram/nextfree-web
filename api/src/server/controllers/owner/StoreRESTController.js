const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Store = require('../../../database/model/Store').Store;
const StoreRepository = require('../../../database/repository/StoreRepository');
const StoreService = require('../../services/StoreService');

const router = new express.Router({mergeParams: true});

router.get('/companies/:id/stores', isOwner, async (req, res) => {

  try {

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let filter = {}

    if (isNaN(page) || page < 0) page = 1
    if (isNaN(limit) || limit < 0) limit = 10

    let items = []
    const total = await StoreRepository.countByFilter(filter)
    if (total > 0) {
      items = await StoreRepository.findByFilter(filter, page, limit)
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

router.get('/companies/:id/stores/:id', isOwner, checkId, async (req, res) => {

  try {

    const entity = await StoreRepository.findOneByFilter({_id: req.params.id})
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json(StoreService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/companies/:id/stores/:id', isOwner, checkId, async (req, res) => {

  try {

    await StoreService.remove(req.params.id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/companies/:id/stores', isOwner, async (req, res) => {

  try {

    const result = await StoreService.create(req.body)

    res.status(201).json(StoreService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/companies/:id/stores/:id', isOwner, checkId, async (req, res) => {

  try {

    const entity = await Store.findById(req.params.id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await StoreService.update(entity, req.body)

    res.status(200).json(StoreService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

