const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({
    data: tasks,
    amount: tasks.length,
    success: true,
  });
});

const getTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
  });
  if (!task) {
    return next()
  }
  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({
      message: `No task with id ${req.params.id}`,
    });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
  });
  if (!task) {
    return res.status(404).json({
      message: `No task with id ${req.params.id}`,
    });
  }
  res.status(200).json({ task });
});

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
