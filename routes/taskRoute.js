const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/tasks", taskController.getAllTasks);

router.get("/tasks/actives", taskController.getActiveTasks);

router.get("/tasks/completed", taskController.getCompletedTasks);

router.delete(
  "/tasks/delete-completed",
  taskController.deleteAllCompletedTasks
);

router.post("/task", taskController.createTask);

router.patch("/task/:id", taskController.markAsCompleted);

router.delete("/task/:id", taskController.deleteTask);

module.exports = router;
