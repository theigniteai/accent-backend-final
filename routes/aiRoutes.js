// POST /respond (AI assistant)
import express from "express";
import { aiRespond } from "../controllers/aiAssistantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/ai/respond
// @desc    AI Assistant generates voice reply
// @access  Private (requires token)
router.post("/respond", protect, aiRespond);

export default router;

