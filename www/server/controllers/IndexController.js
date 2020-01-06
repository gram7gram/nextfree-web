const path = require('path');
const express = require('express');
const template = require('nunjucks');

const views = path.resolve(__dirname, '../views')

const router = new express.Router({mergeParams: true});

router.get('/', (req, res) => {
  const result = template.render(`${views}/index.html.twig`)
  res.send(result)
});

router.get('/login', (req, res) => {
  const result = template.render(`${views}/login.html.twig`)
  res.send(result)
});

router.get('/privacy', (req, res) => {
  const result = template.render(`${views}/privacy.html.twig`)
  res.send(result)
});

module.exports = router;

