const mongoose = require("mongoose");
const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Complaint", ComplaintSchema);
