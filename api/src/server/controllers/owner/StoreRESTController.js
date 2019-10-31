const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Company = require('../../../database/model/Company').Company;
const Store = require('../../../database/model/Store').Store;
const CompanyRepository = require('../../../database/repository/CompanyRepository');
const StoreRepository = require('../../../database/repository/StoreRepository');
const StoreService = require('../../services/StoreService');

const router = new express.Router({mergeParams: true});

const checkCompanyId = (req, res, next) => {

  if (!/^[0-9a-fA-F]{24}$/.test(req.params.company)) {
    res.status(400).json({
      message: 'Invalid `company` in request',
    })
    return
  }

  next()
}

router.get('/companies/:company/stores', isOwner, checkCompanyId, async (req, res) => {

  try {

    const company = await CompanyRepository.findOneByFilter({
      _id: req.params.company,
      ownerId: req.currentUser.user._id
    })
    if (!company) {
      res.status(404).json({
        message: 'No company found'
      })
    }

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
      'companyId': company._id
    }

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

router.get('/companies/:company/stores/:id', isOwner, checkCompanyId, checkId, async (req, res) => {

  try {

    const company = await CompanyRepository.findOneByFilter({
      _id: req.params.company,
      ownerId: req.currentUser.user._id
    })
    if (!company) {
      res.status(404).json({
        message: 'No company found'
      })
    }

    const entity = await StoreRepository.findOneByFilter({
      _id: req.params.id,
      companyId: company._id
    })
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

router.delete('/companies/:company/stores/:id', isOwner, checkCompanyId, checkId, async (req, res) => {

  try {

    const company = await CompanyRepository.findOneByFilter({
      _id: req.params.company,
      ownerId: req.currentUser.user._id
    })
    if (!company) {
      res.status(404).json({
        message: 'No company found'
      })
    }

    const entity = await StoreRepository.findOneByFilter({
      _id: req.params.id,
      companyId: company._id
    })
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    await StoreService.remove(entity._id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/companies/:company/stores', isOwner, checkCompanyId, async (req, res) => {

  try {

    const company = await Company.findOne({
      _id: req.params.company,
      ownerId: req.currentUser.user._id,
    })
    if (!company) {
      res.status(404).json({
        message: 'No company found'
      })
    }

    const result = await StoreService.create({
      ...req.body,
      companyId: company._id
    })

    res.status(201).json(StoreService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/companies/:company/stores/:id', isOwner, checkCompanyId, checkId, async (req, res) => {

  try {

    const company = await Company.findOne({
      _id: req.params.company,
      ownerId: req.currentUser.user._id,
    })
    if (!company) {
      res.status(404).json({
        message: 'No company found'
      })
    }

    const entity = await Store.findOne({
      _id: req.params.id,
      companyId: company._id,
    })
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await StoreService.update(entity, {
      ...req.body,
      companyId: company._id,
    })

    res.status(200).json(StoreService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

