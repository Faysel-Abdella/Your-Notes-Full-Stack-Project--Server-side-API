const express = require("express");

const router = express.Router();

const { verifyJWT } = require("../utils/tokenUtil");

const taskController = require("../controllers/taskController");

router.post("/tasks", verifyJWT, taskController.getAllTasks);

router.post("/tasks/actives", verifyJWT, taskController.getActiveTasks);

router.post("/tasks/completed", verifyJWT, taskController.getCompletedTasks);

router.post(
  "/tasks/delete-completed",
  verifyJWT,
  taskController.deleteAllCompletedTasks
);

router.post("/task", verifyJWT, taskController.createTask);

router.patch("/task/:id", taskController.markAsCompleted);

router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
