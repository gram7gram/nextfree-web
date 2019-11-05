const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const IndexController = require('./controllers/IndexController');

const app = express();

app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, '../build')))

app.use(IndexController)

app.use('*', (req, res) => {
  res.status(404).send('Page not found')
})

module.exports = app