const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isOwner = require('../../services/AuthService').isOwner;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Company = require('../../../database/model/Company').Company;
const CompanyPage = require('../../../database/model/CompanyPage').CompanyPage;
const CompanyPageService = require('../../services/CompanyPageService');
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.get('/companies/:id/website', checkId, isOwner, async (req, res) => {

  try {
    const owner = req.currentUser.user

    const page = await CompanyPage.findOne({
      companyId: req.params.id,
      ownerId: owner._id
    }).lean()
    if (!page) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    res.status(200).json(CompanyPageService.serialize(page))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/companies/:id/website', checkId, isOwner, async (req, res) => {

  try {

    const owner = req.currentUser.user

    const company = await Company.findOne({
      _id: req.params.id,
      ownerId: owner._id
    }).lean()
    if (!company) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    let page = await CompanyPage.findOne({
      ownerId: owner._id,
      companyId: company._id,
    })
    if (!page) {
      page = await CompanyPageService.create(company, {
        ...req.body
      })
    } else {
      page = await CompanyPageService.update(page, {
        ...req.body
      })
    }

    res.status(200).json(CompanyPageService.serialize(page))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/companies/:id/website/:website', checkId, isOwner, async (req, res) => {

  try {

    const owner = req.currentUser.user

    let page = await CompanyPage.findOne({
      _id: req.params.website,
      companyId: req.params.id,
      ownerId: owner._id,
    })
    if (!page) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    page = await CompanyPageService.update(page, {
      ...req.body
    })

    res.status(200).json(CompanyPageService.serialize(page))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

