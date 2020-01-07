const path = require('path');
const express = require('express');

const router = new express.Router({mergeParams: true});

const routes = [
  '/',

  '/login',
  '/register',

  '/qr',
  '/scan',
  '/scan-by-id',

  '/company',
  '/company/page',

  '/stores',
  '/stores/:id',

  '/staff',
  '/staff/invite',
  '/staff/:id',

  '/profile',
  '/profile/security',
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

