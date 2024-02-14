import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/create", createUser);
router.post("/login", login);
router.delete("/:id", deleteUser);

export default router;
