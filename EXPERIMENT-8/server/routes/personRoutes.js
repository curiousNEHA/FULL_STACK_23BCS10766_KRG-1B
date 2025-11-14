import express from "express";
const router = express.Router();
import {getPeople, addPerson, deletePerson } from "../controller/personController.js";

router.get("/", getPeople);
router.post("/", addPerson);
router.delete("/:id", deletePerson);

export default router;
