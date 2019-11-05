const path = require('path');
const express = require('express');

const router = new express.Router({mergeParams: true});

const routes = [
  '/',

  '/profile',

  '/login',

  '/logout',
]

const index = (req, res) => {

  const indexFile = path.resolve(__dirname, '../../build/index.html')

  res.sendFile(indexFile);
}

routes.forEach(route => {
  router.get(route, index);
})

router.get('*', (req, res) => res.redirect('/'))

module.exports = router;

