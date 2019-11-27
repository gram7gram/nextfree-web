const path = require('path');
const express = require('express');

const router = new express.Router({mergeParams: true});

const routes = [
  '/',

  '/login',
  '/register',

  '/qr',
  '/scan',

  '/companies',
  '/companies/:id',

  '/stores',
  '/stores/:id',

  '/staff',
  '/staff/invite',
  '/staff/:id',

  '/profile',
  '/logout',

  '/password-reset',
  '/password-set/:id',

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

