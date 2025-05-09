import { Router } from "express";
import {
  getCallHistory,
  startCall,
  endCall
} from "../controllers/callController.js";

const router = Router();

router.get("/",       getCallHistory);
router.post("/start", startCall);
router.post("/end",   endCall);

export default router;
