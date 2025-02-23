import express from "express";
import { savePainDiaryHandler } from "../handlers";

const router = express.Router();

router.post("/saveData", savePainDiaryHandler);

export default router;
