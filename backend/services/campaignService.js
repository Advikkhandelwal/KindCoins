const Campaign = require("../models/Campaign");

exports.createCampaign = async (data) => {
  return await Campaign.create(data);
};

exports.getAllCampaigns = async () => {
  return await Campaign.find();
};
