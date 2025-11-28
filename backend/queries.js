const Campaign = require('./Campaign');
const Donation = require('./Donation');

// Get all campaigns
const getCampaigns = async () => {
  return await Campaign.find();
};

// Get single campaign with its donations
const getCampaignDetails = async (id) => {
  const campaign = await Campaign.findById(id);
  const donations = await Donation.find({ campaign: id }).sort({ date: -1 });
  return { campaign, donations };
};

// Add new donation and update campaign
const addDonation = async (donationData) => {
  const donation = await Donation.create(donationData);
  
  // Update campaign collected amount
  await Campaign.findByIdAndUpdate(
    donationData.campaign,
    { $inc: { collectedAmount: donationData.amount } }
  );
  
  return donation;
};

// Edit/update existing donation
const updateDonation = async (id, updates) => {
  const oldDonation = await Donation.findById(id);
  
  // If amount changed, update campaign
  if (updates.amount && updates.amount !== oldDonation.amount) {
    const diff = updates.amount - oldDonation.amount;
    await Campaign.findByIdAndUpdate(
      oldDonation.campaign,
      { $inc: { collectedAmount: diff } }
    );
  }
  
  return await Donation.findByIdAndUpdate(id, updates, { new: true });
};

// Get all donations with filters
const getDonations = async (filters = {}) => {
  const query = {};
  
  if (filters.campaign) query.campaign = filters.campaign;
  if (filters.paymentMode) query.paymentMode = filters.paymentMode;
  if (filters.startDate || filters.endDate) {
    query.date = {};
    if (filters.startDate) query.date.$gte = new Date(filters.startDate);
    if (filters.endDate) query.date.$lte = new Date(filters.endDate);
  }
  
  return await Donation.find(query).populate('campaign').sort({ date: -1 });
};

// Get dashboard stats
const getDashboardStats = async () => {
  const campaigns = await Campaign.find();
  const donations = await Donation.find();
  
  const totalCollected = donations.reduce((sum, d) => sum + d.amount, 0);
  const uniqueDonors = [...new Set(donations.map(d => d.donorName))].length;
  
  return {
    totalCollected,
    totalDonations: donations.length,
    uniqueDonors,
    activeCampaigns: campaigns.length
  };
};

// Get leaderboard - top donors
const getLeaderboard = async (limit = 10) => {
  const donations = await Donation.find();
  
  // Group by donor name and sum amounts
  const donorMap = {};
  donations.forEach(d => {
    if (!donorMap[d.donorName]) {
      donorMap[d.donorName] = { name: d.donorName, total: 0, count: 0, type: d.donorType };
    }
    donorMap[d.donorName].total += d.amount;
    donorMap[d.donorName].count += 1;
  });
  
  // Convert to array and sort
  return Object.values(donorMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
    .map((d, i) => ({ rank: i + 1, ...d }));
};

// Get donor summary for Thank You screen
const getDonorSummary = async (donorName) => {
  const donations = await Donation.find({ donorName }).populate('campaign');
  
  const total = donations.reduce((sum, d) => sum + d.amount, 0);
  const campaigns = [...new Set(donations.map(d => d.campaign.name))];
  
  return {
    name: donorName,
    totalDonated: total,
    donationCount: donations.length,
    campaignsSupported: campaigns
  };
};

// Get payment mode breakdown
const getPaymentBreakdown = async () => {
  const donations = await Donation.find();
  
  const breakdown = {};
  donations.forEach(d => {
    if (!breakdown[d.paymentMode]) {
      breakdown[d.paymentMode] = { mode: d.paymentMode, count: 0, total: 0 };
    }
    breakdown[d.paymentMode].count += 1;
    breakdown[d.paymentMode].total += d.amount;
  });
  
  return Object.values(breakdown);
};

// Get campaign performance with milestones
const getCampaignPerformance = async () => {
  const campaigns = await Campaign.find();
  
  return campaigns.map(c => {
    const progress = Math.round((c.collectedAmount / c.targetAmount) * 100);
    return {
      name: c.name,
      target: c.targetAmount,
      collected: c.collectedAmount,
      progress: progress,
      remaining: c.targetAmount - c.collectedAmount,
      milestones: {
        '25%': progress >= 25,
        '50%': progress >= 50,
        '75%': progress >= 75,
        '100%': progress >= 100
      }
    };
  });
};

module.exports = {
  getCampaigns,
  getCampaignDetails,
  addDonation,
  updateDonation,
  getDonations,
  getDashboardStats,
  getLeaderboard,
  getDonorSummary,
  getPaymentBreakdown,
  getCampaignPerformance
};
