const express = require('express');

const Staff = require('../../../database/model/Staff').Staff;
const Company = require('../../../database/model/Company').Company;
const Store = require('../../../database/model/Store').Store;

const AuthService = require('../../services/AuthService')
const ErrorHandler = require('../../services/ErrorHandler')
const StaffService = require('../../services/StaffService')
const CompanyService = require('../../services/CompanyService')
const StoreService = require('../../services/StoreService')

const router = new express.Router({mergeParams: true});

router.post('/login-staff', async (req, res) => {

  const {password, email} = req.body

  if (!(email && password)) {
    res.status(400).json({
      message: 'Bad request'
    })
  }

  try {
    const entity = await Staff.findOne({"user.email": email})

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

    const staff = entity.toObject()

    let company = null
    if (staff.companyId) {
      company = await Company.findOne({
        _id: staff.companyId
      }).lean()
    }

    let store = null
    if (staff.storeId) {
      store = await Store.findOne({
        _id: staff.storeId
      }).lean()
    }

    const content = {
      isStaff: true,
      isAdmin: staff.user.isAdmin === true,
      user: StaffService.serialize(staff),
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

router.post('/login-check-staff', async (req, res) => {

  try {

    const token = AuthService.getToken(req)
    if (!token) {
      res.status(400).json({
        message: 'Bad request'
      })
    }

    const decoded = AuthService.verifyToken(token)
    if (!decoded || !decoded.isStaff) {
      res.status(403).json({
        message: "Access denied"
      });
    }

    const staff = decoded.user

    let company = null
    if (staff.companyId) {
      company = await Company.findOne({
        _id: staff.companyId
      }).lean()
    }

    let store = null
    if (staff.storeId) {
      store = await Store.findOne({
        _id: staff.storeId
      }).lean()
    }

    res.status(200).json({
      isStaff: true,
      isAdmin: staff.user.isAdmin === true,
      user: StaffService.serialize(staff),
      company: company ? CompanyService.serialize(company) : null,
      store: store ? StoreService.serialize(store) : null,
      token
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

