import express from "express";

import {
  getAllAcademicInfo,
  getAcademicInfo,
  postAcademicInfo,
  updateAcademicInfo,
  deleteAcademicInfo,
} from "../controllers/academicInfo.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllAcademicInfo);
router.get("/:academicInfoId", auth, getAcademicInfo);
router.post("/", postAcademicInfo);
router.put("/:academicInfoId", updateAcademicInfo);
router.delete("/:academicInfoId", deleteAcademicInfo);

export default router;
