const mongoose = require('mongoose');

const purchasedTokensSchema = new mongoose.Schema({
  meterNumber: {
    type: String,
    minlength: 6,
    maxlength: 6,
    required: true
  },
  token_status: {
    type: String,
    enum: ['USED', 'NEW', 'EXPIRED'],
    required: true
  },
  token_value_days: {
    type: Number,
    minlength: 11,
    maxlength: 11,
    required: true
  },
  token:{
    type:String,
    minlength:8,
    maxlength:8
  },
  purchasedDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    minlength: 11,
    maxlength: 11,
    required: true
  }
});

const PurchasedTokens = mongoose.model('PurchasedTokens', purchasedTokensSchema);

module.exports = PurchasedTokens;