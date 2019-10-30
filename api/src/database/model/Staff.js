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
  position: {
    type: String,
    required: false
  },
  companyId: {
    type: mongoose.Types.ObjectId,
    required: false
  },
  storeId: {
    type: mongoose.Types.ObjectId,
    required: false
  },
})

schema.pre("save", function (next) {

  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  next();
})

const Staff = mongoose.model('Staff', schema)

module.exports = {Staff, schema}