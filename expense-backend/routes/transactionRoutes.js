import express from "express";
import {
  getTransactions,
  getStats,
  addTransaction,
  deleteTransaction,
  updateTransaction,
  getGroupedStats,
  getMonthlyCategorySummary
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getTransactions).post(protect, addTransaction);

router.get("/stats", protect, getStats);
router.get("/grouped-stats", protect, getGroupedStats);
router.get("/summary", protect, getMonthlyCategorySummary);

router
  .route("/:id")
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

export default router;
