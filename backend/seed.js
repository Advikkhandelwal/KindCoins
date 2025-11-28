const connectDB = require('./connection');
const Campaign = require('./Campaign');
const Donation = require('./Donation');

// Sample campaigns
const campaigns = [
  {
    name: 'Clean Water Initiative',
    description: 'Providing clean drinking water to rural communities',
    targetAmount: 500000,
    category: 'Community'
  },
  {
    name: 'Education Fund',
    description: 'Supporting underprivileged children with education',
    targetAmount: 300000,
    category: 'Education'
  },
  {
    name: 'Medical Help',
    description: 'Emergency medical assistance for families in need',
    targetAmount: 400000,
    category: 'Medical'
  }
];

// Sample donations
const generateDonations = (campaignIds) => {
  const donors = [
    { name: 'Rajesh Kumar', type: 'Individual' },
    { name: 'Priya Sharma', type: 'Individual' },
    { name: 'Global Industries', type: 'Corporate' },
    { name: 'Amit Patel', type: 'Individual' },
    { name: 'TechCorp Solutions', type: 'Corporate' }
  ];
  
  const modes = ['UPI', 'Cash', 'Bank'];
  const donations = [];
  
  campaignIds.forEach(campaignId => {
    // Add 5-8 donations per campaign
    const count = Math.floor(Math.random() * 4) + 5;
    
    for (let i = 0; i < count; i++) {
      const donor = donors[Math.floor(Math.random() * donors.length)];
      donations.push({
        donorName: donor.name,
        amount: Math.floor(Math.random() * 10000) + 1000,
        paymentMode: modes[Math.floor(Math.random() * modes.length)],
        donorType: donor.type,
        campaign: campaignId,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in last 30 days
        notes: `Donation for campaign ${i + 1}`
      });
    }
  });
  
  return donations;
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    console.log('Clearing old data...');
    await Campaign.deleteMany({});
    await Donation.deleteMany({});
    
    console.log('Creating campaigns...');
    const createdCampaigns = await Campaign.insertMany(campaigns);
    
    console.log('Creating donations...');
    const campaignIds = createdCampaigns.map(c => c._id);
    const donations = generateDonations(campaignIds);
    await Donation.insertMany(donations);
    
    // Update collected amounts
    for (const campaign of createdCampaigns) {
      const campaignDonations = await Donation.find({ campaign: campaign._id });
      const total = campaignDonations.reduce((sum, d) => sum + d.amount, 0);
      campaign.collectedAmount = total;
      await campaign.save();
    }
    
    console.log('\nDatabase seeded successfully!');
    console.log(`Created ${createdCampaigns.length} campaigns`);
    console.log(`Created ${donations.length} donations`);
    
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seedDatabase();
