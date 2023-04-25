import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTask,
  getTaskById,
  toggleTask,
  updateTask,
} from "../Controllers/task.controller.js";

const router = Router();

router.post("/create", createTask);


router.get("/getAll", getAllTask);
router.get("/getById/:id", getTaskById);


router.patch("/updata/:id", updateTask);
router.patch("/toggle/:id", toggleTask);


router.delete("/delete/:id", deleteTask);
export default router;
