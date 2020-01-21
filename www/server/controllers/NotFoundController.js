const path = require('path');
const express = require('express');
const template = require('../templating');
const ab = require('../middleware/ab');

const views = path.resolve(__dirname, '../views')

const router = new express.Router({mergeParams: true});

const route = (req, res) => {

  const result = template.render(`${views}/${req.abVersion}/404.html.twig`)

  res.send(result)
};

router.get('/*', ab.defaultVersion, route);
router.get('/:v/*', ab.detectVersion, route);

module.exports = router;

