const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

schema.pre("save", function (next) {

  if (this.isModified("password") && this.password) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
})

schema.methods.comparePassword = function (plaintext) {
  return this.password && bcrypt.compareSync(plaintext, this.password)
}

module.exports = {
  schema
}