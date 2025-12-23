import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Balance from "../models/balance.model.js";

const settleDue = asyncHandler(async (req, res) => {
  const { groupId, fromUser, toUser, amount } = req.body;

  if (!groupId || !fromUser || !toUser || !amount) {
    throw new ApiError(400, "All fields are required");
  }

  const balance = await Balance.findOne({
    groupId,
    fromUser,
    toUser
  });

  if (!balance) {
    throw new ApiError(404, "No outstanding balance found");
  }

  if (amount > balance.amount) {
    throw new ApiError(
      400,
      "Settlement amount exceeds outstanding balance"
    );
  }

  // 🔹 Partial settlement
  if (amount < balance.amount) {
    balance.amount -= amount;
    await balance.save();
  } 
  // 🔹 Full settlement
  else {
    await balance.deleteOne();
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Settlement successful")
  );
});

export { settleDue };
