const express = require('express');

const Customer = require('../../../database/model/Customer').Customer;

const AuthService = require('../../services/AuthService')
const ErrorHandler = require('../../services/ErrorHandler')
const CustomerService = require('../../services/CustomerService')
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.post('/login-customer', async (req, res) => {

  const {password, email} = req.body

  if (!(email && password)) {
    res.status(400).json({
      message: i18n.t('request.bad_request')
    })
  }

  try {
    const entity = await Customer.findOne({"user.email": email})

    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('login.no_user_found')
      }
    }

    if (!entity.isEnabled) {
      throw {
        code: 401,
        message: i18n.t('login.customer_inactive')
      }
    }

    if (!entity.user.comparePassword(password)) {
      throw {
        code: 401,
        message: i18n.t('login.bad_credentials')
      }
    }

    const customer = entity.toObject()

    const content = {
      isCustomer: true,
      isAdmin: customer.user.isAdmin === true,
      user: CustomerService.serialize(customer),
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

router.post('/login-check-customer', async (req, res) => {

  try {

    const token = AuthService.getToken(req)
    if (!token) {
      res.status(400).json({
        message: i18n.t('request.bad_request')
      })
    }

    const decoded = AuthService.verifyToken(token)
    if (!decoded || !decoded.isCustomer) {
      res.status(403).json({
        message: i18n.t('auth.access_denied')
      });
    }

    const customer = await Customer.findById(decoded.user._id).lean()

    if (!customer) {
      throw {
        code: 404,
        message: i18n.t('login.no_user_found')
      }
    }

    if (!customer.isEnabled) {
      throw {
        code: 401,
        message: i18n.t('login.customer_inactive')
      }
    }

    res.status(200).json({
      isCustomer: true,
      isAdmin: customer.user.isAdmin === true,
      user: CustomerService.serialize(customer),
      token
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

