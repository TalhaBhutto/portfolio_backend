import express from "express";

import {
  getAllSkills,
  getSkills,
  postSkills,
  updateSkills,
  deleteSkills,
} from "../controllers/skills.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllSkills);
router.get("/:skillsId", auth, getSkills);
router.post("/", postSkills);
router.put("/:skillsId", updateSkills);
router.delete("/:skillsId", deleteSkills);

export default router;
