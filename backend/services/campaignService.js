const Campaign = require("../models/Campaign");

// Create campaign
exports.createCampaign = async (data) => {
  return await Campaign.create(data);
};

// Get all campaigns
exports.getAllCampaigns = async () => {
  return await Campaign.find();
};

// Get single campaign by ID
exports.getCampaignById = async (id) => {
  return await Campaign.findById(id);
};

// Update campaign
exports.updateCampaign = async (id, data) => {
  return await Campaign.findByIdAndUpdate(id, data, { new: true });
};

// Delete campaign
exports.deleteCampaign = async (id) => {
  return await Campaign.findByIdAndDelete(id);
};
