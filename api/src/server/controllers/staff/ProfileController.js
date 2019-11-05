const express = require('express');
const isStaff = require('../../services/AuthService').isStaff;
const ErrorHandler = require('../../services/ErrorHandler');
const StaffService = require('../../services/StaffService');
const Staff = require('../../../database/model/Staff').Staff;

const router = new express.Router({mergeParams: true});

router.post('/profile', isStaff, async (req, res) => {

  try {

    const entity = await Staff.findById(req.currentUser.user._id)
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    const result = await StaffService.update(entity, req.body)

    res.status(200).json(StaffService.serialize(result))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.get('/profile', isStaff, async (req, res) => {

  try {

    const entity = await Staff.findById(req.currentUser.user._id).lean()
    if (!entity) {
      res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json(StaffService.serialize(entity))

  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

