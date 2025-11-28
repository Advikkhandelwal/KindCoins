const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  targetAmount: {
    type: Number,
    required: true
  },
  collectedAmount: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    enum: ['Education', 'Medical', 'Environment', 'Community', 'Emergency', 'Other'],
    default: 'Other'
  }
}, { timestamps: true });

// Calculate progress percentage
campaignSchema.virtual('progress').get(function() {
  return Math.round((this.collectedAmount / this.targetAmount) * 100);
});

module.exports = mongoose.model('Campaign', campaignSchema);
