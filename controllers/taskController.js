const { StatusCodes } = require("http-status-codes");

const Task = require("../models/userModel");

exports.getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(StatusCodes.OK).json({ tasks: tasks });
  } catch (err) {
    const error = new Error("Can't find all jobs");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

exports.createTask = async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();

  res.status(StatusCodes.CREATED).json({ task: task });
};

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const removedJob = await Task.findByIdAndDelete(id);

  if (!removedJob) {
    const error = new Error(
      "Job not found for providing id in order to delete"
    );
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res.status(StatusCodes.OK).json({ message: "job deleted", job: removedJob });
};

exports.deleteAllCompletedTasks = async (req, req, next) => {
  try {
    await Task.findByIdAndDelete({ completed: true });
    res
      .status(StatusCodes.OK)
      .json({ message: "completed jobs deleted", job: removedJob });
  } catch (err) {
    const error = new Error("Fail to delete all completed jobs");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
};

exports.markAsCompleted = async (req, res, next) => {
  const { id } = req.params;
};
