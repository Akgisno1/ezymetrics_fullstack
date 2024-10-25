const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const campaignController = require("./controllers/campaignController");
const leadController = require("./controllers/leadController");
const { performETLAndGeneratePDF } = require("./utils/reportGenerator");

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Campaign and lead endpoints
app.get("/campaigns", campaignController.getCampaigns);
app.post("/campaigns", campaignController.createCampaign);
app.get("/leads", leadController.getLeads);
app.post("/leads", leadController.createLead);

// Report generation endpoint with ETL
app.get("/report", async (req, res) => {
  try {
    const Campaign = require("./models/campaign.model");
    const Lead = require("./models/lead.model");

    // Fetch campaigns and leads
    const campaigns = await Campaign.find();
    const leads = await Lead.find();

    // Perform ETL and generate PDF
    await performETLAndGeneratePDF(campaigns, leads, res);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: "Error generating report" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
