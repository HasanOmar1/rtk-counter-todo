import express from "express";
import {
  addTodo,
  getTodos,
  removeTodo,
  updateTodo,
} from "../controllers/todoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/add", addTodo); // add protect
router.put("/update/:id", updateTodo); // add protect
router.put("/update", updateTodo); // add protect
router.delete("/:id", removeTodo); // add protect
router.delete("/", removeTodo); // add protect

export default router;
