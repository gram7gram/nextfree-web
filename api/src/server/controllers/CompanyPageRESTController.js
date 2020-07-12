const express = require('express');
const keyBy = require('lodash/keyBy');
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
const StoreService = require('../services/StoreService');
const i18n = require('../../i18n').i18n;

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
      const websites = await CompanyPage.find(filter, null, {
        sort: {publishedAt: -1},
        limit,
        skip: limit * (page - 1)
      }).lean()

      const companyIds = websites.map(item => item.companyId.toString())

      let companies = await Company.find({
        isEnabled: true,
        _id: {$in: companyIds}
      }).lean()

      companies = keyBy(companies, '_id')

      for (const website of websites) {

        website.logo = companies[website.companyId].logo

        items.push({
          _id: website._id.toString(),
          logo: companies[website.companyId].logo,
          title: website.title,
        })

      }
    }

    const totalStores = await Store.countDocuments({
      isEnabled: true,
    })

    const totalCompanies = await Store.countDocuments({
      isEnabled: true,
    })

    res.status(200).json({
      page,
      limit,
      total,
      count: items.length,
      items,
      totalStores,
      totalCompanies,
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

    const stores = await Store.find({
      companyId: company._id,
      isEnabled: true,
    }).lean()

    const purchaseCount = await Purchase.countDocuments({
      'company._id': company._id
    })

    res.status(200).json({
      website: CompanyPageService.serialize(page),
      company: CompanyService.serialize(company),
      owner: OwnerService.serialize(owner),
      stores: stores.map(store => StoreService.serialize(store)),
      storeCount: stores.length,
      purchaseCount,
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;
