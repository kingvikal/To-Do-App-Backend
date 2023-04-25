import { Router } from "express";
import { validRegister } from "../Middleware/userValidation.js";

import {
  deleteUser,
  getAll,
  login,
  register,
} from "../Controllers/user.controller.js";
const router = Router();
import { isUser } from "../Middleware/isUser.js";
import { multerFunction } from "../Middleware/multer.js";

const upload = multerFunction();

router.post("/register", upload.single("photo"), validRegister, register);
router.post("/login", login);
router.post("/", isUser, getAll);
router.get("/getById/:id", getById);
router.post("/update/:id", isUser, update);
router.delete("/delete/:id", deleteUser);

export default router;
