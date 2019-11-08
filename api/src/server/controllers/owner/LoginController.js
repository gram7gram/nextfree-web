const express = require('express');

const Owner = require('../../../database/model/Owner').Owner;
const Company = require('../../../database/model/Company').Company;
const Store = require('../../../database/model/Store').Store;

const AuthService = require('../../services/AuthService')
const ErrorHandler = require('../../services/ErrorHandler')
const OwnerService = require('../../services/OwnerService')
const CompanyService = require('../../services/CompanyService')
const StoreService = require('../../services/StoreService')

const router = new express.Router({mergeParams: true});

router.post('/login-owner', async (req, res) => {

  const {password, email} = req.body

  if (!(email && password)) {
    res.status(400).json({
      message: 'Bad request'
    })
  }

  try {
    const entity = await Owner.findOne({"user.email": email})

    if (!entity) {
      throw {
        code: 404,
        message: 'No user found by email/password'
      }
    }

    if (!entity.isEnabled) {
      throw {
        code: 401,
        message: 'Your account is deactivated. Contact administrator for details'
      }
    }

    if (!entity.user.comparePassword(password)) {
      throw {
        code: 401,
        message: 'Bad credentials'
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
      res.status(400).json({
        message: 'Bad request'
      })
    }

    const decoded = AuthService.verifyToken(token)
    if (!decoded || !decoded.isOwner) {
      res.status(403).json({
        message: "Access denied"
      });
    }

    const owner = decoded.user

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

