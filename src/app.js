import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import expenseRoutes from "./routes/expense.routes.js";
import groupRoutes from "./routes/group.routes.js";
import balanceRoutes from "./routes/balance.routes.js";
import userRoutes from "./routes/user.routes.js";
import settlementRoutes from "./routes/settlement.routes.js";

dotenv.config();

const app = express();

/* -------------------- Middlewares -------------------- */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));

/* -------------------- Health Check -------------------- */
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

/* -------------------- Routes -------------------- */
app.use("/expense-sharing/api/v1/groups", groupRoutes);
app.use("/expense-sharing/api/v1/expenses", expenseRoutes);
app.use("/expense-sharing/api/v1/balances", balanceRoutes);
app.use("/expense-sharing/api/v1/users", userRoutes);
app.use("/expense-sharing/api/v1/settle", settlementRoutes);

/* -------------------- Global Error Handler -------------------- */
app.use((err, req, res, next) => {
  console.error("Global Error:", err);

  const statusCode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statuscode: statusCode,
    message,
    errors: err.errors || [],
    stack:
      process.env.NODE_ENV === "development" ? err.stack : undefined
  });
});

export default app;
