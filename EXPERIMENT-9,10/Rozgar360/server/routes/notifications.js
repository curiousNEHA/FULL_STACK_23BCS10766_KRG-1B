import express from "express";
import { addNotification, getUserNotifications } from "../controller/notificationController.js";


const router = express.Router();

router.post("/add", addNotification); // optional if using direct DB write
router.get("/:userId",getUserNotifications);

export default router;
