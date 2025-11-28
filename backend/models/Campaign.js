const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Campaign", campaignSchema);
