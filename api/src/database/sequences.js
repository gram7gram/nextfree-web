const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  seq: {
    type: Number,
    default: 0,
    required: true
  },
})

const sequences = mongoose.model('sequences', schema)

module.exports = {
  sequences
}