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
  isFirstLoginGreetingViewed: {
    type: Boolean,
    default: false
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

const Owner = mongoose.model('Owner', schema)

module.exports = {Owner, schema}