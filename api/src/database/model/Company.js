const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  isEnabled: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
  },
  name: {
    type: String,
    required: true
  },
  bonusCondition: {
    type: String,
    required: false
  },
})

schema.pre("save", function (next) {

  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  next();
})

const Company = mongoose.model('Company', schema)

module.exports = {Company, schema}