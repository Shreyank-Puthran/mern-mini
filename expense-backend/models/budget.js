import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  month: {
    type: String,
    required: true, // Example format: '2025-06' or just 'June'
  },
  type: {
    type: String,
    enum: ["Essential", "Discretionary"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
