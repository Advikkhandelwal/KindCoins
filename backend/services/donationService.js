const Donation = require("../models/Donation");

exports.createDonation = async (data) => {
  return await Donation.create(data);
};

exports.getAllDonations = async () => {
  return await Donation.find().populate("campaign");
};



