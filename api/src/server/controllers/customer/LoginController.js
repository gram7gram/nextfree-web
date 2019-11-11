const express = require('express');

const Customer = require('../../../database/model/Customer').Customer;

const AuthService = require('../../services/AuthService')
const ErrorHandler = require('../../services/ErrorHandler')
const CustomerService = require('../../services/CustomerService')

const router = new express.Router({mergeParams: true});

router.post('/login-customer', async (req, res) => {

  const {password, email} = req.body

  if (!(email && password)) {
    res.status(400).json({
      message: 'Bad request'
    })
  }

  try {
    const entity = await Customer.findOne({"user.email": email})

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

    const content = {
      isCustomer: true,
      isAdmin: staff.user.isAdmin === true,
      user: CustomerService.serialize(staff),
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
        message: 'Bad request'
      })
    }

    const decoded = AuthService.verifyToken(token)
    if (!decoded || !decoded.isCustomer) {
      res.status(403).json({
        message: "Access denied"
      });
    }

    res.status(200).json({
      isCustomer: true,
      isAdmin: decoded.user.isAdmin === true,
      user: CustomerService.serialize(decoded.user),
      token
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

