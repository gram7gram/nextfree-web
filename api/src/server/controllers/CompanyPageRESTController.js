const express = require('express');
const ErrorHandler = require('../services/ErrorHandler');
const checkId = require('../services/RequestParamsValidator').checkId;

const CompanyPage = require('../../database/model/CompanyPage').CompanyPage;
const Owner = require('../../database/model/Owner').Owner;
const Company = require('../../database/model/Company').Company;
const Purchase = require('../../database/model/Purchase').Purchase;
const Store = require('../../database/model/Store').Store;

const CompanyService = require('../services/CompanyService');
const OwnerService = require('../services/OwnerService');
const CompanyPageService = require('../services/CompanyPageService');
// const i18n = require('../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.get('/partner-websites', async (req, res) => {

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

    const filter = {
      isEnabled: true,
      status: 'PUBLISHED'
    }

    let items = []
    const total = await CompanyPage.countDocuments(filter)
    if (total > 0) {
      items = await CompanyPage.find(filter, {limit, offset: limit * (page - 1)})

      items = items.map(item => CompanyPageService.serialize(item))
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

router.get('/partner-websites/:id', checkId, async (req, res) => {

  try {

    const page = await CompanyPage.findOne({
      _id: req.params.id,
      isEnabled: true,
      status: 'PUBLISHED'
    }).lean()
    if (!page) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    const company = await Company.findOne({
      _id: page.companyId,
    }).lean()
    if (!company) {
      throw {
        code: 404,
        message: i18n.t('partner_website.company_not_found')
      }
    }

    if (!company.isEnabled) {
      throw {
        code: 404,
        message: i18n.t('partner_website.company_disabled')
      }
    }

    const owner = await Owner.findOne({
      _id: company.ownerId,
    }).lean()
    if (!owner) {
      throw {
        code: 404,
        message: i18n.t('partner_website.owner_not_found')
      }
    }

    if (!company.isEnabled) {
      throw {
        code: 404,
        message: i18n.t('partner_website.owner_disabled')
      }
    }

    const storeCount = await Store.countDocuments({
      isEnabled: true,
      companyId: company._id
    })

    const purchaseCount = await Purchase.countDocuments({
      'company._id': company._id
    })

    res.status(200).json({
      website: CompanyPageService.serialize(page),
      company: CompanyService.serialize(company),
      owner: OwnerService.serialize(owner),
      storeCount,
      purchaseCount,
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

