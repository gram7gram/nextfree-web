const mongoose = require('mongoose');
const User = require('./User').schema;

const schema = new mongoose.Schema({
  user: {
    type: User,
    required: true
  },
  isEnabled: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
  },
})

schema.pre("save", function (next) {

  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  next();
})

const Customer = mongoose.model('Customer', schema)

module.exports = {Customer, schema}