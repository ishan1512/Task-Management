import express from "express";
import { createTask, deleteTask, getTasks, updateTaskStatus } from "../controllers/task.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/",protectRoute, getTasks);
router.post("/",protectRoute, createTask);
router.put("/:taskId",protectRoute, updateTaskStatus)
router.delete("/:taskId",protectRoute, deleteTask)


export default router;