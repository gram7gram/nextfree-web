const express = require('express');
const Customer = require('../../database/model/Customer').Customer;
const Staff = require('../../database/model/Staff').Staff;
const Owner = require('../../database/model/Owner').Owner;
const AuthService = require('../services/AuthService')
const ErrorHandler = require('../services/ErrorHandler')
const StaffService = require('../services/StaffService')
const OwnerService = require('../services/OwnerService')
const CustomerService = require('../services/CustomerService')

const router = new express.Router({mergeParams: true});

router.post('/login', async (req, res) => {

  try {

    const {password, email} = req.body

    if (!(email && password)) {
      res.status(400).json({
        message: 'Bad request'
      })
    }

    const getOwner = new Promise((resolve, reject) => {
      Owner.findOne({"user.email": email}, (e, entity) => {

        if (e) {
          reject(e)
          return
        }

        if (!entity) {
          resolve(null)
          return
        }

        if (!entity.isEnabled) {
          reject({
            code: 401,
            message: 'Your account is deactivated. Contact administrator for details'
          })
        }

        if (entity.user.comparePassword(password)) {

          const user = entity.toObject()

          resolve({
            isOwner: true,
            isAdmin: user.user.isAdmin === true,
            user: OwnerService.serialize(user)
          })
        } else {
          reject({
            code: 401,
            message: 'Bad credentials'
          })
        }
      })
    });

    const getStaff = new Promise((resolve, reject) => {
      Staff.findOne({"user.email": email}, (e, entity) => {

        if (e) {
          reject(e)
          return
        }

        if (!entity) {
          resolve(null)
          return
        }

        if (!entity.isEnabled) {
          reject({
            code: 401,
            message: 'Your account is deactivated. Contact store administrator for details'
          })
        }

        if (entity.user.comparePassword(password)) {

          const user = entity.toObject()

          resolve({
            isStaff: true,
            isAdmin: user.user.isAdmin === true,
            user: StaffService.serialize(user)
          })
        } else {
          reject({
            code: 401,
            message: 'Bad credentials'
          })
        }

      })
    });

    const getCustomer = new Promise((resolve, reject) => {
      Customer.findOne({"user.email": email}, (e, entity) => {

        if (e) {
          reject(e)
          return
        }

        if (!entity) {
          resolve(null)
          return
        }

        if (!entity.isEnabled) {
          reject({
            code: 401,
            message: 'Your account is deactivated. Contact us for details'
          })
        }

        if (entity.user.comparePassword(password)) {

          const user = entity.toObject()

          resolve({
            isCustomer: true,
            isAdmin: user.user.isAdmin === true,
            user: CustomerService.serialize(user)
          })
        } else {
          reject({
            code: 401,
            message: 'Bad credentials'
          })
        }


      })
    });

    Promise.all([
      getCustomer,
      getStaff,
      getOwner,
    ]).then(results => {

      const match = results.find(result => !!result && result.user)
      if (!match) {
        res.status(404).json({
          message: 'No user found by email/password'
        })
      }

      const token = AuthService.generateAuthToken(match)

      res.cookie('token', token).status(200).json({
        ...match,
        token
      })

    }).catch(e => {
      ErrorHandler.handle(res, e)
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/login-check', async (req, res) => {

  try {

    const token = AuthService.getToken(req)
    if (!token) {
      res.status(400).json({
        message: 'Bad request'
      })
      return
    }

    const content = AuthService.verifyToken(token)
    if (!content) {
      res.status(403).json({
        message: "Access denied"
      });
      return
    }

    if (content.isCustomer) {
      content.user = CustomerService.serialize(content.user)
    } else if (content.isOwner) {
      content.user = OwnerService.serialize(content.user)
    } else if (content.isStaff) {
      content.user = StaffService.serialize(content.user)
    }

    res.status(200).json({
      ...content,
      token
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

