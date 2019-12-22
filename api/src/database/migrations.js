const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
})

const migrations = mongoose.model('migrations', schema)

module.exports = {
  migrations
}