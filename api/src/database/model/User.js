const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: false
  },
  password: {
    type: String,
    required: true
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

  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  next();
})

schema.methods.comparePassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password)
}

module.exports = {
  schema
}