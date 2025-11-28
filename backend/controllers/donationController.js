const donationService = require("../services/donationService");

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
