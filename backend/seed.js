const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Campaign = require("./models/Campaign");
const Donation = require("./models/Donation");
const connectDB = require("./config/db");

dotenv.config();

const campaigns = [
  {
    name: "Education for All",
    targetAmount: 500000,
    description: "Providing books and tuition for underprivileged children.",
  },
  {
    name: "Clean Water Initiative",
    targetAmount: 200000,
    description: "Building wells in drought-affected villages.",
  },
  {
    name: "Animal Shelter Support",
    targetAmount: 150000,
    description: "Food and medical care for stray animals.",
  },
  {
    name: "Disaster Relief Fund",
    targetAmount: 1000000,
    description: "Emergency aid for flood victims.",
  },
];

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing
    await Campaign.deleteMany();
    await Donation.deleteMany();

    // Insert Campaigns
    const createdCampaigns = await Campaign.insertMany(campaigns);

    // Create Donations linked to Campaigns
    const donations = [
      {
        donorName: "Roni Maity",
        amount: 5000,
        campaign: createdCampaigns[0]._id,
        paymentMode: "UPI",
        donorType: "Individual",
        notes: "Keep up the good work!",
        date: new Date(),
      },
      {
        donorName: "John Doe",
        amount: 10000,
        campaign: createdCampaigns[1]._id,
        paymentMode: "Bank",
        donorType: "Corporate",
        notes: "CSR Initiative",
        date: new Date(),
      },
      {
        donorName: "Jane Smith",
        amount: 2000,
        campaign: createdCampaigns[2]._id,
        paymentMode: "Cash",
        donorType: "Individual",
        date: new Date(),
      },
      {
        donorName: "Alice Wonderland",
        amount: 15000,
        campaign: createdCampaigns[0]._id,
        paymentMode: "UPI",
        donorType: "Individual",
        date: new Date(),
      }
    ];

    await Donation.insertMany(donations);

    console.log("Campaigns and Donations Seeded!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
