const express = require("express");
const router = express.Router();
const {
  addDonation,
  getDonations,
  getAnalytics,
  getLeaderboard,
  updateDonation,
  deleteDonation
} = require("../controllers/donationController");

router.post("/add", addDonation);
router.get("/", getDonations);
router.get("/analytics", getAnalytics);
router.get("/leaderboard", getLeaderboard);
router.put("/:id", updateDonation);
router.delete("/:id", deleteDonation);

module.exports = router;
