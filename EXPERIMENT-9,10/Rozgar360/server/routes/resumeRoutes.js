import express from "express";
import multer from "multer";
import { analyzeResume } from "../controller/resumeController.js";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// POST route
router.post("/analyze", upload.single("resume"), analyzeResume);

export default router;
