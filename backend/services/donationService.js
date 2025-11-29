const Donation = require("../models/Donation");

const Campaign = require("../models/Campaign");
const mongoose = require("mongoose");

exports.createDonation = async (data) => {
  const campaign = await Campaign.findById(data.campaign);
  if (!campaign) {
    throw new Error("Campaign not found");
  }

  // Calculate total collected so far
  const result = await Donation.aggregate([
    { $match: { campaign: new mongoose.Types.ObjectId(data.campaign) } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]);

  const currentTotal = result.length > 0 ? result[0].total : 0;

  if (currentTotal >= campaign.targetAmount) {
    throw new Error("Campaign target already reached");
  }

  if (currentTotal + data.amount > campaign.targetAmount) {
    const remaining = campaign.targetAmount - currentTotal;
    throw new Error(`Donation exceeds target. You can only donate up to ₹${remaining}`);
  }

  return await Donation.create(data);
};

exports.getAllDonations = async () => {
  return await Donation.find().populate("campaign").sort({ date: -1 });
};



