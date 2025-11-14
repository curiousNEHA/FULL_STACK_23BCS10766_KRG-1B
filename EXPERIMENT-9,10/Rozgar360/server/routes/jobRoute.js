import express from "express";
const router = express.Router();
import { getJob, addJob, deleteJob } from "../controller/addjobController.js";

router.get("/", getJob);
router.post("/", addJob);
router.delete("/:id", deleteJob);

export default router;
