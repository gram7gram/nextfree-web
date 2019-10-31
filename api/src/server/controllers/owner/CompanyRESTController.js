const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Company = require('../../../database/model/Company').Company;
const CompanyRepository = require('../../../database/repository/CompanyRepository');
const CompanyService = require('../../services/CompanyService');

const router = new express.Router({mergeParams: true});

router.get('/companies', isOwner, async (req, res) => {

  try {

    let page = parseInt(req.query.page)
    let limit = parseInt(req.query.limit)
    let filter = {}

    if (isNaN(page) || page < 0) page = 1
    if (isNaN(limit) || limit < 0) limit = 10

    let items = []
    const total = await CompanyRepository.countByFilter(filter)
    if (total > 0) {
      items = await CompanyRepository.findByFilter(filter, page, limit)
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

router.get('/companies/:id', isOwner, checkId, async (req, res) => {

  try {

    const entity = await CompanyRepository.findOneByFilter({_id: req.params.id})
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json(CompanyService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/companies/:id', isOwner, checkId, async (req, res) => {

  try {

    await CompanyService.remove(req.params.id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/companies', isOwner, async (req, res) => {

  try {

    const result = await CompanyService.create(req.body)

    res.status(201).json(CompanyService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/companies/:id', isOwner, checkId, async (req, res) => {

  try {

    const entity = await Company.findById(req.params.id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await CompanyService.update(entity, req.body)

    res.status(200).json(CompanyService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

