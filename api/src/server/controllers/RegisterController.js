const express = require('express');
const ErrorHandler = require('../services/ErrorHandler')

const StaffService = require('../services/StaffService')
const OwnerService = require('../services/OwnerService')
const CustomerService = require('../services/CustomerService')

const router = new express.Router({mergeParams: true});

router.post('/owner/register', async (req, res) => {

  try {

    const entity = await OwnerService.create(req.body)

    res.status(201).json(OwnerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/staff/register', async (req, res) => {

  try {

    const entity = await StaffService.create(req.body)

    res.status(201).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/customer/register', async (req, res) => {

  try {

    const entity = await CustomerService.create(req.body)

    res.status(201).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

