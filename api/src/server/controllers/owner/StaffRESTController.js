const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Staff = require('../../../database/model/Staff').Staff;
const StaffRepository = require('../../../database/repository/StaffRepository');
const CompanyRepository = require('../../../database/repository/CompanyRepository');
const StaffService = require('../../services/StaffService');

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

router.get('/companies/:company/staff', isOwner, checkCompanyId, async (req, res) => {

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

    const filter = {
      companyId: company._id
    }

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

router.get('/companies/:company/staff/:id', isOwner, checkCompanyId, checkId, async (req, res) => {

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

    const entity = await StaffRepository.findOneByFilter({
      $and: [
        {
          _id: req.params.id
        },
        {
          $or: [
            {companyId: company._id},
            {companyId: null},
          ]
        }
      ]
    })
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

router.delete('/companies/:company/staff/:id', isOwner, checkCompanyId, checkId, async (req, res) => {

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

    const entity = await Staff.findOne({
      $and: [
        {
          _id: req.params.id
        },
        {
          $or: [
            {companyId: company._id},
            {companyId: null},
          ]
        }
      ]
    })
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    await StaffService.remove(entity._id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/companies/:company/staff', isOwner, checkCompanyId, async (req, res) => {

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

    const result = await StaffService.create({
      ...req.body,
      companyId: company._id
    })

    res.status(201).json(StaffService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/companies/:company/staff/:id', isOwner, checkCompanyId, checkId, async (req, res) => {

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

    const entity = await Staff.findOne({
      $and: [
        {
          _id: req.params.id
        },
        {
          $or: [
            {companyId: company._id},
            {companyId: null},
          ]
        }
      ]
    })
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

