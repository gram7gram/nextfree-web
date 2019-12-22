const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Company = require('../../../database/model/Company').Company;
const Store = require('../../../database/model/Store').Store;
const CompanyRepository = require('../../../database/repository/CompanyRepository');
const StoreRepository = require('../../../database/repository/StoreRepository');
const StoreService = require('../../services/StoreService');
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

const checkCompanyId = (req, res, next) => {

  if (!/^[0-9a-fA-F]{24}$/.test(req.params.company)) {
    res.status(400).json({
      message: i18n.t('request.invalid_company_id'),
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
        message: i18n.t('request.not_found')
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

    if (req.query.filter) {
      if (req.query.filter.search) {
        filter.$or = [
          {'address': {$regex: req.query.filter.search, $options: 'im'}},
          {'city': {$regex: req.query.filter.search, $options: 'im'}},
        ]
      }
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
        message: i18n.t('request.not_found')
      })
    }

    const entity = await StoreRepository.findOneByFilter({
      _id: req.params.id,
      companyId: company._id
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

router.delete('/companies/:company/stores/:id', isOwner, checkCompanyId, checkId, async (req, res) => {

  try {

    const company = await CompanyRepository.findOneByFilter({
      _id: req.params.company,
      ownerId: req.currentUser.user._id
    })
    if (!company) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    const entity = await StoreRepository.findOneByFilter({
      _id: req.params.id,
      companyId: company._id
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

router.post('/companies/:company/stores', isOwner, checkCompanyId, async (req, res) => {

  try {

    const company = await Company.findOne({
      _id: req.params.company,
      ownerId: req.currentUser.user._id,
    })
    if (!company) {
      res.status(404).json({
        message: i18n.t('request.not_found')
      })
    }

    const result = await StoreService.create({
      ...req.body,
      isEnabled: true,
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
        message: i18n.t('request.not_found')
      })
    }

    const entity = await Store.findOne({
      _id: req.params.id,
      companyId: company._id,
    })
    if (!entity) {
      res.status(404).json({
        message: i18n.t('request.not_found')
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

