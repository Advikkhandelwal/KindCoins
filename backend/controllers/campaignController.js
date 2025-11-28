const campaignService = require("../services/campaignService");

// Create campaign
exports.createCampaign = async (req, res) => {
  try {
    const campaign = await campaignService.createCampaign(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all campaigns
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await campaignService.getAllCampaigns();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single campaign by ID
exports.getCampaignById = async (req, res) => {
  try {
    const campaign = await campaignService.getCampaignById(req.params.id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update campaign
exports.updateCampaign = async (req, res) => {
  try {
    const updated = await campaignService.updateCampaign(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const deleted = await campaignService.deleteCampaign(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Campaign not found" });
    }
    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
