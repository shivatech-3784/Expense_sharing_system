import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apierror.js"
import ApiResponse from "../utils/apiResponse.js"
import Group from "../models/group.model.js"
import "../models/user.model.js";

const createGroup = asyncHandler(async (req, res) => {
  const { name, members } = req.body;

  if (!name || !members || members.length === 0) {
    throw new ApiError(400, "Group name and members are required");
  }

  const group = await Group.create({
    name,
    createdBy: req.user?._id || members[0], // temp fallback
    members
  });

  return res
    .status(201)
    .json(new ApiResponse(201, group, "Group created successfully"));
});

const getGroupDetails = asyncHandler(async (req, res) => {
  const group = await Group.findById(req.params.groupId)
    .populate("members", "name email");

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, group, "Group details fetched"));
});

export { createGroup, getGroupDetails };