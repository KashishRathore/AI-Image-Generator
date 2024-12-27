import express from "express";
import { generateImage } from "../controllers/GenerateAllImage.js";

const router = express.Router();

router.post("/", generateImage);

export default router;