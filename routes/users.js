import express from "express";

import { signin, updateProfile, getUserInfo } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.put("/update/profile", auth, updateProfile);
router.get("/detail/:userId", auth, getUserInfo);
router.post("/signin", signin);

export default router;
