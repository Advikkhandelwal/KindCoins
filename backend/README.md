# KindCoins Backend - MongoDB Setup

Simple MongoDB database for the React Native app.

## Quick Setup

1. Install dependencies:
```bash
cd backend
npm install
```

2. Run the seed script:
```bash
npm run seed
```

Done! Your database is ready with sample data.

## How to Use in Your React Native App

```javascript
// Import the functions you need
const { getCampaigns, addDonation, getDashboardStats } = require('../backend/queries');

// Get all campaigns
const campaigns = await getCampaigns();

// Add a donation
await addDonation({
  donorName: 'John Doe',
  amount: 5000,
  paymentMode: 'UPI',
  donorType: 'Individual',
  campaign: campaignId,
  notes: 'Great cause!'
});

// Get dashboard stats
const stats = await getDashboardStats();
console.log(stats.totalCollected);
console.log(stats.uniqueDonors);
```

## Available Functions

**All functions from `queries.js`:**

1. `getCampaigns()` - Get all campaigns
2. `getCampaignDetails(id)` - Get campaign with its donations  
3. `addDonation(data)` - Add new donation (auto-updates campaign)
4. `updateDonation(id, updates)` - Edit/correct donation
5. `getDonations(filters)` - Filter by mode/date/campaign
6. `getDashboardStats()` - Total collected & donor count
7. `getLeaderboard(limit)` - Top donors by amount
8. `getDonorSummary(name)` - For "Thank You" screen
9. `getPaymentBreakdown()` - Contributions by payment mode
10. `getCampaignPerformance()` - Campaign progress with milestones (25%, 50%, 75%, 100%)

Covers ALL requirements:
- Add donations (name, amount, date, mode, type, notes)
- Edit donations
- Tag to campaigns
- Campaign (name, target, description)
- Total collected & donor count
- Filter by mode, date, campaign
- Campaign milestones (25%, 50%, 75%, 100%)
- Leaderboard
- Thank You screen
- Payment breakdown

## Filter Examples

```javascript
// Filter by campaign
getDonations({ campaign: campaignId });

// Filter by payment mode
getDonations({ paymentMode: 'UPI' });

// Filter by date range
getDonations({ 
  startDate: '2024-01-01', 
  endDate: '2024-12-31' 
});

// Combine filters
getDonations({ 
  campaign: campaignId,
  paymentMode: 'UPI',
  startDate: '2024-11-01'
});
```

## Database Schema

**Campaign:**
- name, description, targetAmount, collectedAmount, category

**Donation:**
- donorName, amount, date, paymentMode, donorType, campaign (reference), notes

That's all you need to know for the hackathon.
