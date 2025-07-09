import mongoose from "mongoose";
import Transaction from "../models/transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id });

    let income = 0;
    let expense = 0;

    transactions.forEach((txn) => {
      if (txn.type === "Income") income += txn.amount;
      else if (txn.type === "Expense") expense += txn.amount;
    });

    const savings = income - expense;

    res.status(200).json({
      income,
      expense,
      savings,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addTransaction = async (req, res) => {
  const { type, amount, category, payee, note, date } = req.body;

  if (!type || !amount || !category) {
    return res
      .status(400)
      .json({ message: "Type, amount, and category are required" });
  }

  if (type === "Expense" && !payee) {
    return res
      .status(400)
      .json({ message: "Payee is required for expense transactions" });
  }

  try {
    const transaction = new Transaction({
      userId: req.user._id,
      type,
      amount,
      category,
      payee,
      note,
      date,
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const txn = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!txn) return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  const { type, amount, category, payee, note, date } = req.body;

  if (!type || !amount || !category) {
    return res
      .status(400)
      .json({ message: "Type, amount, and category are required" });
  }

  if (type === "Expense" && !payee) {
    return res
      .status(400)
      .json({ message: "Payee is required for expense transactions" });
  }

  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { type, amount, category, payee, note, date },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Transaction not found" });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGroupedStats = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    // Group by month and year
    const monthlyStats = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.month": -1,
        },
      },
    ]);

    // Group by week
    const weeklyStats = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: {
            year: { $isoWeekYear: "$date" },
            week: { $isoWeek: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: {
          "_id.year": -1,
          "_id.week": -1,
        },
      },
    ]);

    res.status(200).json({ monthlyStats, weeklyStats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMonthlyCategorySummary = async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user._id);
  const { month } = req.query; // Expecting format: "2025-06"

  if (!month) {
    return res.status(400).json({ message: "Month query is required (e.g. 2025-06)" });
  }

  try {
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    const summary = await Transaction.aggregate([
      {
        $match: {
          userId,
          type: "Expense",
          date: { $gte: startDate, $lt: endDate }
        }
      },
      {
        $group: {
          _id: "$category",
          totalSpent: { $sum: "$amount" }
        }
      }
    ]);

    // Convert array to object like { "Shopping": 310, "Food & Drinks": 420 }
    const result = {};
    summary.forEach((item) => {
      result[item._id] = item.totalSpent;
    });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};