const express = require("express");
const router = express.Router();
const {
  addDonation,
  getDonations
} = require("../controllers/donationController");

router.post("/add", addDonation);
router.get("/", getDonations);

module.exports = router;
