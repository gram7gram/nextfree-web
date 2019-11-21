const express = require('express');

const AuthService = require('../services/AuthService')
const ErrorHandler = require('../services/ErrorHandler')
const i18n = require('../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.post('/login', async (req, res) => {

  const {password, email} = req.body

  if (!(email && password)) {
    res.status(400).json({
      message: i18n.t('request.bad_request')
    })
  }

  try {

    Promise.all([
      new Promise((resolve, reject) =>
        AuthService.authorizeCustomerByEmailPassword(email, password)
          .then(resolve)
          .catch(reject)
      ),
      new Promise((resolve, reject) =>
        AuthService.authorizeOwnerByEmailPassword(email, password)
          .then(resolve)
          .catch(reject)
      ),
      new Promise((resolve, reject) =>
        AuthService.authorizeStaffByEmailPassword(email, password)
          .then(resolve)
          .catch(reject)
      ),
    ]).then(results => {

      const content = results.find(item => !!item)
      if (!content) {
        res.status(404).json({
          results,
          message: i18n.t('login.no_user_found')
        })
      }

      const token = AuthService.generateAuthToken(content)

      res.status(200).json({
        ...content,
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
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const decoded = AuthService.verifyToken(token)
    if (!decoded) {
      throw {
        code: 403,
        message: i18n.t('auth.access_denied')
      }
    }

    let content

    if (decoded.isStaff) {
      content = await AuthService.authorizeStaffById(decoded.user._id)
    } else if (decoded.isOwner) {
      content = await AuthService.authorizeStaffById(decoded.user._id)
    } else if (decoded.isCustomer) {
      content = await AuthService.authorizeCustomerById(decoded.user._id)
    }

    if (!content) {
      throw {
        code: 403,
        message: i18n.t('auth.access_denied')
      }
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

