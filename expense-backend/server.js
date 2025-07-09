import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./database/connect.js";
import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.APP_URL_CLIENT,
    credentials: true,
  })
);

app.use("/api/auth", userRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);

connectDB(process.env.MONGO_URI);

// Testing backend connection
// app.get("/api/ping", (req, res) => {
//   res.json({ message: "Backend is Connected!" });
// });

app.get("/", (req, res) => {
  res.send("Expense Tracker Backend running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
