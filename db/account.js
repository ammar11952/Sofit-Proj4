//const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');
const { float } = require('webidl-conversions');

const accountSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Account must have a userId'],
  },
  accNo: {
    type: String,
    required: [true, 'Account must have an account number'],
    unique: true,
    validate: [validator.isIBAN, 'Incorrect IBAN'],
  },
  balance: {
    type: Number,
    min: 0,
    default: 0,
  },
});

module.exports = mongoose.model('Account', accountSchema);
