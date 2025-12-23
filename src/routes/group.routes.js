import { Router } from "express";
import {
  createGroup,
  getGroupDetails
} from "../controllers/group.controller.js";

const router = Router();

router.post("/", createGroup);
router.get("/:groupId", getGroupDetails);

export default router;
