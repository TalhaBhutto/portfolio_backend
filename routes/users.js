import express from "express";

import { signin, updateProfile, getUserInfo } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.put("/", auth, updateProfile);
router.get("/:userId", auth, getUserInfo);
router.post("/signin", signin);

export default router;
