const campaignService = require("../services/campaignService");

// Add campaign
exports.addCampaign = async (req, res) => {
  try {
    const campaign = await campaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
