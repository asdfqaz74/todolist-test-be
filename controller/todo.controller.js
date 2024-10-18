const Todo = require("../model/todo");

const todoController = {};

todoController.createTodo = async (req, res) => {
  try {
    const { todo, isDone } = req.body;
    const newTodo = new Todo({ todo, isDone });
    await newTodo.save();
    res.status(200).json({ status: "Success", data: newTodo });
  } catch (e) {
    res.status(400).json({ status: "Error", error: e.message });
  }
};

todoController.getTodo = async (req, res) => {
  try {
    const todoList = await Todo.find({}).select("-__v");
    res.status(200).json({ status: "Success", data: todoList });
  } catch (e) {
    res.status(400).json({ status: "Error", error: e.message });
  }
};

todoController.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    const fields = Object.keys(req.body);
    fields.map((field) => (todo[field] = req.body[field]));
    await todo.save();
  } catch (e) {
    res.status(400).json({ status: "Error", error: e.message });
  }
};

todoController.deleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "Success", data: deleteTodo });
  } catch (e) {
    res.status(400).json({ status: "Error", error: e.message });
  }
};
module.exports = todoController;
