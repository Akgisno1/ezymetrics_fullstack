const PDFDocument = require("pdfkit");
const { sendAlertEmail } = require("./emailService");

/**
 * Perform ETL to transform raw data into meaningful metrics.
 * - Extracts and aggregates metrics, such as total clicks, number of leads, etc.
 * - Checks if any campaigns exceed the click threshold for email alerts.
 */
exports.performETLAndGeneratePDF = async (campaigns, leads, res) => {
  // Transform Data
  const totalLeads = leads.length;
  const totalCampaigns = campaigns.length;
  const clickThreshold = 10;
  const campaignsExceedingClicks = [];

  // Summarize and filter campaigns
  const processedCampaigns = campaigns.map((campaign) => {
    if (campaign.clicks > clickThreshold) {
      campaignsExceedingClicks.push(campaign);
    }
    return {
      name: campaign.name,
      clicks: campaign.clicks,
    };
  });

  // Send email alerts for campaigns exceeding the click threshold
  for (const campaign of campaignsExceedingClicks) {
    await sendAlertEmail(
      `Campaign "${campaign.name}" Alert`,
      `Campaign "${campaign.name}" has ${campaign.clicks} clicks, exceeding the limit of 10 clicks.`
    );
  }

  // Generate PDF report
  const doc = new PDFDocument();
  doc.fontSize(20).text("Campaign and Lead Report", { align: "center" });
  doc.moveDown();

  // Add summary data
  doc.fontSize(14).text(`Total Campaigns: ${totalCampaigns}`);
  doc.text(`Total Leads: ${totalLeads}`);
  doc.moveDown();

  // Add detailed campaign data
  doc.fontSize(16).text("Campaign Details:");
  processedCampaigns.forEach((campaign) => {
    doc.fontSize(12).text(`- ${campaign.name}: ${campaign.clicks} clicks`);
  });

  // Stream the PDF back to the response
  res.setHeader("Content-Type", "application/pdf");
  doc.pipe(res);
  doc.end();
};
