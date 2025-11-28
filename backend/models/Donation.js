const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  paymentMode: {
    type: String,
    enum: ["UPI", "Cash", "Bank"],
    required: true,
  },
  donorType: {
    type: String,
    enum: ["Individual", "Corporate"],
    required: true,
  },
  notes: { type: String },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
});

module.exports = mongoose.model("Donation", donationSchema);
