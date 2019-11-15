const express = require('express');

const Owner = require('../../../database/model/Owner').Owner;
const Company = require('../../../database/model/Company').Company;
const Store = require('../../../database/model/Store').Store;

const AuthService = require('../../services/AuthService')
const ErrorHandler = require('../../services/ErrorHandler')
const OwnerService = require('../../services/OwnerService')
const CompanyService = require('../../services/CompanyService')
const StoreService = require('../../services/StoreService')
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.post('/login-owner', async (req, res) => {

  const {password, email} = req.body

  if (!(email && password)) {
    res.status(400).json({
      message: i18n.t('request.bad_request')
    })
  }

  try {
    const entity = await Owner.findOne({"user.email": email})

    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('login.no_user_found')
      }
    }

    if (!entity.isEnabled) {
      throw {
        code: 401,
        message: i18n.t('login.owner_inactive')
      }
    }

    if (!entity.user.comparePassword(password)) {
      throw {
        code: 401,
        message: i18n.t('login.bad_credentials')
      }
    }

    const owner = entity.toObject()

    const company = await Company.findOne({
      ownerId: owner._id
    }).lean()

    let store = null
    if (company) {
      store = await Store.findOne({
        companyId: company._id
      }).lean()
    }

    const content = {
      isOwner: true,
      isAdmin: owner.user.isAdmin === true,
      user: OwnerService.serialize(owner),
      company: company ? CompanyService.serialize(company) : null,
      store: store ? StoreService.serialize(store) : null,
    }

    const token = AuthService.generateAuthToken(content)

    res.status(200).json({
      ...content,
      token
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }

})

router.post('/login-check-owner', async (req, res) => {

  try {

    const token = AuthService.getToken(req)
    if (!token) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const decoded = AuthService.verifyToken(token)
    if (!decoded || !decoded.isOwner) {
      throw {
        code: 403,
        message: i18n.t('auth.access_denied')
      }
    }

    const owner = await Owner.findById(decoded.user._id).lean()

    if (!owner) {
      throw {
        code: 404,
        message: i18n.t('login.no_user_found')
      }
    }

    if (!owner.isEnabled) {
      throw {
        code: 401,
        message: i18n.t('login.owner_inactive')
      }
    }

    const company = await Company.findOne({
      ownerId: owner._id
    }).lean()

    let store = null
    if (company) {
      store = await Store.findOne({
        companyId: company._id
      }).lean()
    }

    res.status(200).json({
      isOwner: true,
      isAdmin: owner.user.isAdmin === true,
      user: OwnerService.serialize(owner),
      company: company ? CompanyService.serialize(company) : null,
      store: store ? StoreService.serialize(store) : null,
      token
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

