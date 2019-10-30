const express = require('express');
const isAuthenticated = require('../services/AuthService').isAuthenticated;
const ErrorHandler = require('../services/ErrorHandler');

const router = new express.Router({mergeParams: true});

router.get('/profile', isAuthenticated, async (req, res) => {

  try {


  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

router.post('/profile', isAuthenticated, async (req, res) => {

  try {


  } catch (e) {
    ErrorHandler.handle(res, e)
  }
})

module.exports = router;

