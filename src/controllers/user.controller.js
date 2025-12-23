import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import User from "../models/user.model.js";

const createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new ApiError(400, "Name and email are required");
  }

  const user = await User.create({ name, email });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User created"));
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, "name email");
  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched"));
});

export { createUser, getUsers };
