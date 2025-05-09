// GET /profile, PUT /settings
import express from "express";
import { getProfile, updateSettings } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/settings", protect, updateSettings);

export default router;
