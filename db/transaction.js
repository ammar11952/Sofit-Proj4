const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const validator = require('validator');

const transactionSchema = new mongoose.Schema({
  senderAccId: {
    type: String,
    required: [true, 'User must have an email'],
    validate: [validator.isMongoId, 'Invalid Sender Acc Id'],
  },
  receiverAccId: {
    type: String,
    required: [true, 'User must have an email'],
    validate: [validator.isMongoId, 'Invalid Sender Acc Id'],
  },
  status: {
    type: String,
    default: 'pending',
  },
  amount: {
    type: Number,
    required: [true, 'Transaction must have an amount'],
    min: 0,
  },
});

transactionSchema.set('timestamps', true);

module.exports = mongoose.model('Transaction', transactionSchema);
