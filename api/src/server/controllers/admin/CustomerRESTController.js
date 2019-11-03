const express = require('express');
const ErrorHandler = require('../../services/ErrorHandler');
const isAdmin = require('../../services/AuthService').isAdmin;
const checkId = require('../../services/RequestParamsValidator').checkId;

const Customer = require('../../../database/model/Customer').Customer;
const CustomerRepository = require('../../../database/repository/CustomerRepository');
const CustomerService = require('../../services/CustomerService');

const router = new express.Router({mergeParams: true});

router.get('/customers', isAdmin, async (req, res) => {

  try {

    let page = 1, limit = 10

    if (req.query.limit !== undefined) {
      limit = parseInt(req.query.limit)
      if (isNaN(limit) || limit < 0) limit = 10
    }

    if (req.query.page !== undefined) {
      page = parseInt(req.query.page)
      if (isNaN(page) || page < 0) page = 10
    }

    const filter = {}

    let items = []
    const total = await CustomerRepository.countByFilter(filter)
    if (total > 0) {
      items = await CustomerRepository.findByFilter(filter, page, limit)

      items = items.map(item => CustomerService.serialize(item))
    }

    res.status(200).json({
      page,
      limit,
      total,
      count: items.length,
      items,
    })

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.get('/customers/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await CustomerRepository.findOneByFilter({_id: req.params.id})
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json(CustomerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.delete('/customers/:id', isAdmin, checkId, async (req, res) => {

  try {

    await CustomerService.remove(req.params.id)

    res.status(204).send()

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/customers', isAdmin, async (req, res) => {

  try {

    const result = await CustomerService.create(req.body)

    res.status(201).json(CustomerService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.put('/customers/:id', isAdmin, checkId, async (req, res) => {

  try {

    const entity = await Customer.findById(req.params.id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await CustomerService.update(entity, req.body)

    res.status(200).json(CustomerService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

