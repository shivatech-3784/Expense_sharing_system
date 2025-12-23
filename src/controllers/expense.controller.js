import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Expense from "../models/expense.model.js";
import { updateBalance } from "../services/balance.service.js";

const addExpense = asyncHandler(async (req, res) => {
  const {
    groupId,
    description,
    totalAmount,
    paidBy,
    splitType,
    splits
  } = req.body;

  if (!groupId || !paidBy || !totalAmount || !splitType || !splits) {
    throw new ApiError(400, "Missing required fields");
  }

  // ✅ Validation
  if (splitType === "EXACT") {
    const sum = splits.reduce((acc, s) => acc + s.amount, 0);
    if (sum !== totalAmount) {
      throw new ApiError(400, "Exact split amounts must equal total amount");
    }
  }

  if (splitType === "PERCENT") {
    const percentSum = splits.reduce((acc, s) => acc + s.amount, 0);
    if (percentSum !== 100) {
      throw new ApiError(400, "Percent split must total 100%");
    }
  }

  // 1️⃣ Store expense (store raw splits: percent or exact)
  const expense = await Expense.create({
    groupId,
    description,
    totalAmount,
    paidBy,
    splitType,
    splits
  });

  // 2️⃣ Update balances
  for (const split of splits) {
    if (split.userId.toString() === paidBy.toString()) continue;

    let shareAmount = split.amount;

    if (splitType === "PERCENT") {
      shareAmount = (totalAmount * split.amount) / 100;
    }

    await updateBalance(
      split.userId,     // fromUser (owes)
      paidBy,           // toUser (paid)
      shareAmount,      // ✅ actual amount
      groupId
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(201, expense, "Expense added"));
});

export { addExpense };
