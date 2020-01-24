const path = require('path');
const express = require('express');

const router = new express.Router({mergeParams: true});

const routes = [
  '/',

  '/qr',
  '/scan',
  '/scan-by-id',

  '/customers',
  '/customers/new',
  '/customers/:id/edit',
  '/customers/:id/page',

  '/owners',
  '/owners/new',
  '/owners/:id/edit',

  '/companies',
  '/companies/new',
  '/companies/:id/edit',

  '/stores',
  '/stores/new',
  '/stores/:id/edit',

  '/staff',
  '/staff/invite',
  '/staff/:id/edit',

  '/purchases',
  '/login',
  '/profile',
  '/profile/security',
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

