const express = require('express');

const AuthService = require('../../services/AuthService')
const ErrorHandler = require('../../services/ErrorHandler')
const i18n = require('../../../i18n').i18n;

const router = new express.Router({mergeParams: true});

router.post('/login-staff', async (req, res) => {

  const {password, email} = req.body

  if (!(email && password)) {
    res.status(400).json({
      message: i18n.t('request.bad_request')
    })
  }

  try {
    const content = await AuthService.authorizeStaffByEmailPassword(email, password)
    if (!content) {
      res.status(404).json({
        message: i18n.t('login.no_user_found')
      })
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
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const decoded = AuthService.verifyToken(token)
    if (!decoded || !decoded.isStaff || !decoded.user) {
      throw {
        code: 403,
        message: i18n.t('auth.access_denied')
      }
    }

    const content = await AuthService.authorizeStaffById(decoded.user._id)

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

