const { StatusCodes } = require("http-status-codes");

const Task = require("../models/userModel");

exports.getAllTasks = async (req, res, next) => {
  const tasks = await Task.find();
  if (!tasks) {
    return res.json({ message: "No task, please add a a task to see tasks" });
  }
  res.status(StatusCodes.OK).json({ tasks: tasks });
};

exports.createTask = async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();

  res.status(StatusCodes.CREATED).json({ task: task });
};

exports.deleteTask = async (req, res, next) => {
  const id = req.params.id;
  const removedJob = await Task.findByIdAndRemove(id);

  if (!removedJob) {
    const error = new Error(
      "Job not found for providing id in order to delete"
    );
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res.status(StatusCodes.OK).json({ message: "job deleted", job: removedJob });
};

exports.deleteAllCompletedTasks = async (req, res, next) => {
  const removedTasks = await Task.findByIdAndDelete({ completed: true });
  if (!removedTasks) {
    const error = new Error("Fail to delete all completed jobs");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "completed jobs deleted", job: removedJob });
};

exports.markAsCompleted = async (req, res, next) => {
  const { id } = req.params;

  const markedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

  if (!markedTask) {
    const error = new Error("Fail to mark as completed");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res.status(StatusCodes.CREATED).json({
    message: "Successfully marked as completed",
    markedTask: markedTask,
  });
};
