const donationService = require("../services/donationService");
const Donation = require("../models/Donation"); // Assuming model is needed for direct aggregation if service doesn't cover it

// Add donation
exports.addDonation = async (req, res) => {
  try {
    const donation = await donationService.createDonation(req.body);
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all donations
exports.getDonations = async (req, res) => {
  try {
    const donations = await donationService.getAllDonations();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const totalDonations = await Donation.aggregate([
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
    ]);

    const donationsByCampaign = await Donation.aggregate([
      {
        $group: {
          _id: "$campaign",
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "_id",
          foreignField: "_id",
          as: "campaign",
        },
      },
      {
        $unwind: "$campaign",
      },
      {
        $project: {
          campaignName: "$campaign.name",
          targetAmount: "$campaign.targetAmount",
          totalAmount: 1,
          count: 1,
        },
      },
    ]);

    const result = {
      total: totalDonations[0] || { totalAmount: 0, count: 0 },
      byCampaign: donationsByCampaign,
    };
    console.log("Analytics Result:", JSON.stringify(result, null, 2));
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Donation.aggregate([
      {
        $group: {
          _id: "$donorName",
          totalDonated: { $sum: "$amount" },
          donationCount: { $sum: 1 },
        },
      },
      { $sort: { totalDonated: -1 } },
      { $limit: 10 },
    ]);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Donation
exports.updateDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Donation
exports.deleteDonation = async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.json({ message: "Donation deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
