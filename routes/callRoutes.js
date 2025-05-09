// GET/POST /calls
import express from "express";
import { saveCallLog, getCallLogs } from "../controllers/callLogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCallLogs);
router.post("/", protect, saveCallLog);

export default router;
