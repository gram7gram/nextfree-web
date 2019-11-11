const path = require('path');
const express = require('express');

const router = new express.Router({mergeParams: true});

router.get('/terms', (req, res) => {

  const indexFile = path.resolve(__dirname, '../../build/terms.html')

  res.sendFile(indexFile);
});

router.get('/privacy', (req, res) => {

  const indexFile = path.resolve(__dirname, '../../build/privacy.html')

  res.sendFile(indexFile);
});

module.exports = router;

