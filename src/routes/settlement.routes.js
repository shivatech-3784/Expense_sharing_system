import { Router } from "express";
import { settleDue } from "../controllers/settlement.controller.js";

const router = Router();

router.post("/", settleDue);

export default router;
