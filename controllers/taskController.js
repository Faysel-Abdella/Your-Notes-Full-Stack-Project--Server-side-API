const { StatusCodes } = require("http-status-codes");

const Task = require("../models/taskModel");

exports.getAllTasks = async (req, res, next) => {
  const tasks = await Task.find({ createdBy: req.userId });

  if (!tasks) {
    return res.json({ message: "No task, please add a a task to see tasks" });
  }
  res.status(StatusCodes.OK).json({ tasks: tasks });
};

exports.getActiveTasks = async (req, res, next) => {
  const activeTasks = await Task.find({
    createdBy: req.userId,
    completed: "false",
  });

  if (!activeTasks) {
    return res.json({
      message: "No task, please add a a task to see activeTasks",
    });
  }
  res.status(StatusCodes.OK).json({ activeTasks: activeTasks });
};

exports.getCompletedTasks = async (req, res, next) => {
  const completedTasks = await Task.find({
    createdBy: req.userId,
    completed: "true",
  });

  if (!completedTasks) {
    return res.json({
      message: "No task, please add a a task to see completedTasks",
    });
  }
  res.status(StatusCodes.OK).json({ completedTasks: completedTasks });
};

exports.createTask = async (req, res, next) => {
  //Extract the attached file
  req.body.createdBy = req.userId;
  const task = new Task(req.body);

  await task.save();

  res.status(StatusCodes.CREATED).json({ task: task });
};

exports.deleteTask = async (req, res, next) => {
  const id = req.params.id;
  const removedJob = await Task.findByIdAndRemove(id);

  if (!removedJob) {
    const error = new Error(
      "Task not found for providing id in order to delete"
    );
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res.status(StatusCodes.OK).json({ message: "Task deleted", job: removedJob });
};

exports.deleteAllCompletedTasks = async (req, res, next) => {
  const removedTasks = await Task.deleteMany({
    createdBy: req.userId,
    completed: "true",
  });
  const tasksAfterRemoving = await Task.find({ createdBy: req.userId });

  if (!removedTasks) {
    const error = new Error("Fail to delete all completed tasks");
    error.StatusCode = StatusCodes.NOT_FOUND;
    throw error;
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "completed tasks deleted", tasksAfterRemoving });
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
