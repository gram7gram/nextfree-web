const mongoose = require('mongoose');

const meta = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  keywords: {
    type: String,
  },
})

const social = new mongoose.Schema({
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  email: {
    type: String,
  },
})

const schema = new mongoose.Schema({
  createdAt: {
    type: Date,
  },
  companyId: {
    type: mongoose.Types.ObjectId,
  },
  ownerId: {
    type: mongoose.Types.ObjectId,
  },
  isEnabled: {
    type: Boolean,
  },
  updatedAt: {
    type: Date,
  },
  publishedAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['PUBLISHED', 'DRAFT', 'IN_REVIEW']
  },
  reviewedBy: {
    type: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  social: {
    type: social,
  },
  meta: {
    type: meta,
  },
})

schema.pre("save", function (next) {

  if (!this.createdAt) {
    this.createdAt = new Date()
  }

  this.updatedAt = new Date()

  next();
})

const CompanyPage = mongoose.model('CompanyPage', schema)

module.exports = {CompanyPage, schema}