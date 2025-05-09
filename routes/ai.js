import { Router } from "express";
import { callAiAssistant } from "../controllers/aiController.js";

const router = Router();

router.post("/assistant", callAiAssistant);

export default router;
