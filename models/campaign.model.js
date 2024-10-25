const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: String,
  clicks: Number,
});

module.exports = mongoose.model("Campaign", campaignSchema);
