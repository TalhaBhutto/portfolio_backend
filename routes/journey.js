import express from "express";

import {
  getAllJourney,
  getJourney,
  postJourney,
  updateJourney,
  deleteJourney,
} from "../controllers/journey.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.get("/", auth, getAllJourney);
router.get("/:journeyId", auth, getJourney);
router.post("/", postJourney);
router.put("/:journeyId", updateJourney);
router.delete("/:journeyId", deleteJourney);

export default router;
