import express from "express";
import { toggleBookmark ,addComment, getUserApplications,getUncelebratedAcceptedApplications } from "../controller/applicationController.js";


const router = express.Router();

// POST - Add or update comment for a job application
router.post("/:id/comment", addComment);
// GET - Fetch all applications for a user
router.get("/user/:userId", getUserApplications);
router.get("/user/:userId/uncelebrated", getUncelebratedAcceptedApplications);
router.put("/bookmark/:id", toggleBookmark); 
export default router;
