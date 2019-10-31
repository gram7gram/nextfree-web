const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Staff = require('../../../database/model/Staff').Staff;
const StaffRepository = require('../../../database/repository/StaffRepository');
const StaffService = require('../../services/StaffService');

const router = new express.Router({mergeParams: true});

router.get('/staff', isOwner, async (req, res) => {

  try {

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let filter = {}

    if (isNaN(page) || page < 0) page = 1
    if (isNaN(limit) || limit < 0) limit = 10

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

router.get('/staff/:id', isOwner, checkId, async (req, res) => {

  try {

    const entity = await StaffRepository.findOneByFilter({_id: req.params.id})
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/staff/:id', isOwner, checkId, async (req, res) => {

  try {

    await StaffService.remove(req.params.id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/staff', isOwner, async (req, res) => {

  try {

    const result = await StaffService.create(req.body)

    res.status(201).json(StaffService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/staff/:id', isOwner, checkId, async (req, res) => {

  try {

    const entity = await Staff.findById(req.params.id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await StaffService.update(entity, req.body)

    res.status(200).json(StaffService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

