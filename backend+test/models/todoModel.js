import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: [true, "Add a todo"],
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
