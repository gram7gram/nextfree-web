const express = require('express');
const path = require('path');

const IndexController = require('./controllers/IndexController');
const PrivacyController = require('./controllers/PrivacyController');

const app = express();

app.use(IndexController)
app.use(PrivacyController)

app.use(express.static(path.resolve(__dirname, '../build')))

app.use('*', (req, res) => {
  res.status(404).send('Page not found')
})

module.exports = app