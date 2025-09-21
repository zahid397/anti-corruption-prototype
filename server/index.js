const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Local Mongo (later change to Atlas if needed)
const MONGO_URI = "mongodb://127.0.0.1:27017/complaintsDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ Mongo error:", err));

// Model (inline for now)
const ComplaintSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  status: { type: String, default: "pending" }, // pending | in_progress | resolved
  createdAt: { type: Date, default: Date.now }
});
const Complaint = mongoose.model("Complaint", ComplaintSchema);

// Routes
app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.post("/api/complaints", async (req, res) => {
  try {
    const complaint = await Complaint.create(req.body);
    res.json({ success: true, complaint });
  } catch (e) {
    res.status(400).json({ success: false, error: e.message });
  }
});

app.get("/api/complaints", async (_req, res) => {
  const list = await Complaint.find().sort({ createdAt: -1 }).lean();
  res.json(list);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
