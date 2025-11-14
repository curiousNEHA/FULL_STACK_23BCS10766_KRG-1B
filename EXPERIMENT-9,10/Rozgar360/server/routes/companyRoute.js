import express from "express";
const router = express.Router();
import { getCompanies, addCompany, deleteCompany } from "../controller/addcompanyController.js";

router.get("/", getCompanies);
router.post("/", addCompany);
router.delete("/:id", deleteCompany);

export default router;
