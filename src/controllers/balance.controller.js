import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/apiResponse.js";
import Balance from "../models/balance.model.js";

const getGroupBalances = asyncHandler(async (req, res) => {
  const balances = await Balance.find({
    groupId: req.params.groupId
  }).populate("fromUser toUser", "name email");

  return res
    .status(200)
    .json(new ApiResponse(200, balances, "Balances fetched"));
});

export { getGroupBalances };
