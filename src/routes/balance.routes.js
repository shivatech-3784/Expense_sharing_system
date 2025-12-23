import { Router } from "express";
import { getGroupBalances } from "../controllers/balance.controller.js";

const router = Router();

router.get("/:groupId", getGroupBalances);

export default router;
