const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isAdmin = require('../../services/AuthService').isAdmin;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Owner = require('../../../database/model/Owner').Owner;
const OwnerRepository = require('../../../database/repository/OwnerRepository');
const OwnerService = require('../../services/OwnerService');
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.get('/owners', isAdmin, async (req, res) => {

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

    const filter = {}

    let items = []
    const total = await OwnerRepository.countByFilter(filter)
    if (total > 0) {
      items = await OwnerRepository.findByFilter(filter, page, limit)

      items = items.map(item => OwnerService.serialize(item))
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

router.get('/owners/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await OwnerRepository.findOneByFilter({_id: req.params.id})
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    res.status(200).json(OwnerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/owners/:id', isAdmin, checkId, async (req, res) => {

  try {

    await OwnerService.remove(req.params.id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/owners', isAdmin, async (req, res) => {

  try {

    const result = await OwnerService.create(req.body)

    res.status(201).json(OwnerService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/owners/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await Owner.findById(req.params.id)
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    const result = await OwnerService.update(entity, req.body)

    res.status(200).json(OwnerService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

