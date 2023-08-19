const { StatusCodes } = require("http-status-codes");

const Task = require("../models/userModel");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(StatusCodes.OK).json({ tasks: tasks });
  } catch (error) {}
};
