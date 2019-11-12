const mongoose = require('mongoose');

const Company = require('./Company').schema;
const Customer = require('./Customer').schema;
const Staff = require('./Staff').schema;
const Store = require('./Store').schema;

const schema = new mongoose.Schema({
  staff: {
    type: Staff,
    required: true
  },
  store: {
    type: Store,
    required: false
  },
  company: {
    type: Company,
    required: true
  },
  customer: {
    type: Customer,
    required: true
  },
  bonusCondition: {
    type: String,
    required: true
  },
  isBonus: {
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

const Purchase = mongoose.model('Purchase', schema)

module.exports = {Purchase, schema}