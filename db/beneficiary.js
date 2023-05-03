const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const beneficiarySchema = new mongoose.Schema({
  initiatorUserId: {
    type: String,
    required: [true, 'Beneficiary must have an initiator user id'],
    validate: [validator.isMongoId, 'Invalid initiator user id'],
  },
  beneficiaryUserId: {
    type: String,
    required: [true, 'Beneficiary must have a beneficiary user id'],
    validate: [validator.isMongoId, 'Invalid beneficiary user id'],
  },
  initiatorAccId: {
    type: String,
    required: [true, 'Beneficiary must have an initiator acc id'],
    validate: [validator.isMongoId, 'Invalid initiator acc id'],
  },
  beneficiaryAccId: {
    type: String,
    required: [true, 'Beneficiary must have a beneficiary acc id'],
    validate: [validator.isMongoId, 'Invalid beneficiary acc id'],
  },
  name: {
    type: String,
    required: [true, 'Beneficiary must have a name'],
    default: 'Anon',
  },
  contact: {
    type: String,
    required: [true, 'Beneficiary must have contact number'],
    unique: true,
    validate: [validator.isMobilePhone, 'Invalid contact number'],
  },
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);
