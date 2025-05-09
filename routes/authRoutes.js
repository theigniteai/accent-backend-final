// POST /signup, /login, /send-otp
import express from "express";
import { signup, login, sendOtp } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtp);

export default router;
