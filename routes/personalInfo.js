import express from "express";

import {
  getAllPersonalInfo,
  getPersonalInfo,
  postPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
} from "../controllers/personalInfo.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllPersonalInfo);
router.get("/:personalInfoId", auth, getPersonalInfo);
router.post("/", postPersonalInfo);
router.put("/:personalInfoId", updatePersonalInfo);
router.delete("/:personalInfoId", deletePersonalInfo);

export default router;
