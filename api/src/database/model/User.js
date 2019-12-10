const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  isEmailVerified: {
    type: Boolean,
    required: false
  },
  activationToken: {
    type: String,
    required: false
  },
  emailResetToken: {
    type: String,
    required: false
  },
  invitationToken: {
    type: String,
    required: false
  },
  avatar: {
    type: String,
    required: false
  },
  isAdmin: {
    type: Boolean,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  birthday: {
    type: Date,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
})

module.exports = {
  schema
}