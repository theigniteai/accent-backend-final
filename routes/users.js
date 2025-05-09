import { Router } from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";

const router = Router();

router.get("/me",    getProfile);
router.put("/me",    updateProfile);

export default router;
