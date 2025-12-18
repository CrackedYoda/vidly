import express from "express";
import { validateUserMiddleware } from "../middleware/validationFactory.js";
import {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", validateUserMiddleware, addUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", validateUserMiddleware, updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);

export default router;