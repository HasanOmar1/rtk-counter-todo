import STATUS_CODE from "../constants/statusCode.js";
import Todo from "../models/todoModel.js";

export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (error) {
    next(error);
  }
};

export const addTodo = async (req, res, next) => {
  try {
    const { todo } = req.body;
    if (!todo) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("ADD A TODO");
    }
    const createTodo = await Todo.create({ todo });
    res.status(201);
    res.send(createTodo);
  } catch (error) {
    next(error);
  }
};

export const removeTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error(`This todo is not on the list`);
    }

    res.send(todo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { todo: req.body.todo },
      { new: true }
    );
    if (!todo) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error(`Add a todo!`);
    }

    if (!updatedTodo) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error(`This todo is not on the list`);
    }

    res.send(updatedTodo);
  } catch (error) {
    next(error);
  }
};
