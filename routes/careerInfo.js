import express from "express";

import {
  getAllCareerInfo,
  getCareerInfo,
  postCareerInfo,
  updateCareerInfo,
  deleteCareerInfo,
} from "../controllers/careerInfo.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllCareerInfo);
router.get("/:careerInfoId", auth, getCareerInfo);
router.post("/", postCareerInfo);
router.put("/:careerInfoId", updateCareerInfo);
router.delete("/:careerInfoId", deleteCareerInfo);

export default router;
