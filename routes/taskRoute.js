const express = require("express");

const router = express.Router();

const { verifyJWT } = require("../utils/tokenUtil");

const taskController = require("../controllers/taskController");

router.post("/tasks", verifyJWT, taskController.getAllTasks);

router.get("/tasks/actives", taskController.getActiveTasks);

router.get("/tasks/completed", taskController.getCompletedTasks);

router.delete(
  "/tasks/delete-completed",
  taskController.deleteAllCompletedTasks
);

router.post("/task", verifyJWT, taskController.createTask);

router.patch("/task/:id", taskController.markAsCompleted);

router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
