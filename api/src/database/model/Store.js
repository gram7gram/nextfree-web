const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  companyId: {
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
  city: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  lng: {
    type: Number,
    required: false
  },
  lat: {
    type: Number,
    required: false
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

const Store = mongoose.model('Store', schema)

module.exports = {Store, schema}