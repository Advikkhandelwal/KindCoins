const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  paymentMode: {
    type: String,
    enum: ['UPI', 'Cash', 'Bank'],
    required: true
  },
  donorType: {
    type: String,
    enum: ['Individual', 'Corporate'],
    required: true
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
