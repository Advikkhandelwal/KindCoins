const express = require("express");
const router = express.Router();
const {
  addCampaign,
  getCampaigns
} = require("../controllers/campaignController");

router.post("/add", addCampaign);
router.get("/", getCampaigns);

module.exports = router;
