import express from "express";
import { checkAuth, login, logout, refreshToken, signup } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check",protectRoute, checkAuth)
router.post("/refresh-token", refreshToken);

export default router;