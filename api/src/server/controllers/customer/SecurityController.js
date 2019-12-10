const express = require('express');
const bcrypt = require('bcryptjs');
const ErrorHandler = require('../../services/ErrorHandler')

const i18n = require('../../../i18n').i18n
const Customer = require('../../../database/model/Customer').Customer
const isCustomer = require('../../services/AuthService').isCustomer
const CustomerService = require('../../services/CustomerService')

const router = new express.Router({mergeParams: true});

router.post('/security', isCustomer, async (req, res) => {

  try {

    const customer = req.currentUser.user

    const {currentPassword, newPassword} = req.body

    if (!(currentPassword && newPassword)) {
      throw {
        code: 400,
        message: i18n.t('request.bad_request')
      }
    }

    const entity = await Customer.findById(customer._id)
    if (!entity) {
      throw {
        code: 404,
        message: i18n.t('request.not_found')
      }
    }

    if (!bcrypt.compareSync(currentPassword, entity.user.password)) {
      throw {
        code: 403,
        message: i18n.t('reset_password.mismatch')
      }
    }

    entity.user.password = bcrypt.hashSync(newPassword, 10);

    await entity.save()

    res.status(201).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

