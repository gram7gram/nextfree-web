const express = require('express');
const cors = require('cors');
const path = require('path');

const MediaController = require('./controllers/MediaController');

const app = express();

app.use(cors())

app.use('/api/v1', MediaController)

app.use(express.static(path.resolve(__dirname, '../public')))

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Not found'
  })
})

module.exports = app