import express from "express";

import {
  getAllProjects,
  getProjects,
  postProjects,
  updateProjects,
  deleteProjects,
} from "../controllers/projects.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllProjects);
router.get("/:projectsId", auth, getProjects);
router.post("/", postProjects);
router.put("/:projectsId", updateProjects);
router.delete("/:projectsId", deleteProjects);

export default router;
