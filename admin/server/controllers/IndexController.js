const path = require('path');
const express = require('express');

const router = new express.Router({mergeParams: true});

const routes = [
  '/',

  '/login',
  '/register',

  '/qr',
  '/scan',

  '/customers',
  '/customers/new',
  '/customers/:id',

  '/owners',
  '/owners/new',
  '/owners/:id',

  '/companies',
  '/companies/new',
  '/companies/:id',

  '/stores',
  '/stores/new',
  '/stores/:id',

  '/staff',
  '/staff/new',
  '/staff/:id',

  '/profile',
  '/logout',
]

const index = (req, res) => {

  const indexFile = path.resolve(__dirname, '../../build/index.html')

  res.sendFile(indexFile);
}

routes.forEach(route => {
  router.get(route, index);
})

module.exports = router;

