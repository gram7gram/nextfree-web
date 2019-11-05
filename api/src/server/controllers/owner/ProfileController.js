const express = require('express');
const isOwner = require('../../services/AuthService').isOwner;
const ErrorHandler = require('../../services/ErrorHandler');
const OwnerService = require('../../services/OwnerService');
const Owner = require('../../../database/model/Owner').Owner;

const router = new express.Router({mergeParams: true});

router.post('/profile', isOwner, async (req, res) => {

  try {

    const entity = await Owner.findById(req.currentUser.user._id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await OwnerService.update(entity, req.body)

    res.status(200).json(OwnerService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.get('/profile', isOwner, async (req, res) => {

  try {

    const entity = await Owner.findById(req.currentUser.user._id).lean()
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json(OwnerService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

