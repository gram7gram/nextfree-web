const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isAdmin = require('../../services/AuthService').isAdmin;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Company = require('../../../database/model/Company').Company;
const CompanyRepository = require('../../../database/repository/CompanyRepository');
const CompanyService = require('../../services/CompanyService');
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.get('/companies', isAdmin, async (req, res) => {

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
    const total = await CompanyRepository.countByFilter(filter)
    if (total > 0) {
      items = await CompanyRepository.findByFilter(filter, page, limit)

      items = items.map(item => CompanyService.serialize(item))
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

router.get('/companies/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await CompanyRepository.findOneByFilter({
      _id: req.params.id
    })
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    res.status(200).json(CompanyService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/companies/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await CompanyRepository.findOneByFilter({
      _id: req.params.id
    })
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    await CompanyService.remove(entity._id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/companies', isAdmin, async (req, res) => {

  try {

    const result = await CompanyService.create({
      ...req.body
    })

    res.status(201).json(CompanyService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/companies/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await Company.findOne({
      _id: req.params.id
    })
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    const result = await CompanyService.update(entity, {
      ...req.body
    })

    res.status(200).json(CompanyService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

