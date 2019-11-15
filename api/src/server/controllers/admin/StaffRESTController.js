const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isAdmin = require('../../services/AuthService').isAdmin;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Staff = require('../../../database/model/Staff').Staff;
const StaffRepository = require('../../../database/repository/StaffRepository');
const StaffService = require('../../services/StaffService');
const i18n = require('../../../i18n');

const router = new express.Router({mergeParams: true});

router.get('/staff', isAdmin, async (req, res) => {

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
    const total = await StaffRepository.countByFilter(filter)
    if (total > 0) {
      items = await StaffRepository.findByFilter(filter, page, limit)

      items = items.map(item => StaffService.serialize(item))
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

router.get('/staff/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await StaffRepository.findOneByFilter({_id: req.params.id})
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    res.status(200).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/staff/:id', isAdmin, checkId, async (req, res) => {

  try {

    await StaffService.remove(req.params.id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/staff', isAdmin, async (req, res) => {

  try {

    const result = await StaffService.create(req.body)

    res.status(201).json(StaffService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/staff/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await Staff.findById(req.params.id)
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    const result = await StaffService.update(entity, req.body)

    res.status(200).json(StaffService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

