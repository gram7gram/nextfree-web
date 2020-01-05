const path = require('path');
const express = require('express');

const views = path.resolve(__dirname, '../views')

const router = new express.Router({mergeParams: true});

router.get('/', (req, res) => {
  res.sendFile(`${views}/index.html`)
});

router.get('/login', (req, res) => {
  res.sendFile(`${views}/login.html`)
});

router.get('/privacy', (req, res) => {
  res.sendFile(`${views}/privacy.html`)
});

module.exports = router;

