const path = require('path');
const express = require('express');

const router = new express.Router({mergeParams: true});

const routes = [
  '/',

  '/login',

  '/qr',
  '/scan',
  '/scan-by-id',

  '/purchases',
  '/profile',
  '/profile/security',
  '/logout',

  '/password-reset',
  '/password-set/:id',

  '/invitation/:id',
  '/activation/:id',
]

const index = (req, res) => {

  const indexFile = path.resolve(__dirname, '../../build/index.html')

  res.sendFile(indexFile);
}

routes.forEach(route => {
  router.get(route, index);
})

module.exports = router;

