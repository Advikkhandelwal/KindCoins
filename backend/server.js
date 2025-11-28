const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/campaigns", require("./routes/campaignRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("✅ KindCoins Backend Running");
});

// Error Handler
const errorHandler = require("./middlewares/errorMiddleware");
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
