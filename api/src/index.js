const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const LoginController = require('./server/controllers/LoginController');
const RegisterController = require('./server/controllers/RegisterController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Public API
app.use('/api/v1', LoginController);
app.use('/api/v1', RegisterController);

app.all('*', (req, res) => {
  res.status(404).json({
    message: 'No route found'
  })
});

module.exports = app
