const express = require("express");

const router = express.Router();

const taskController = require("../controllers/taskController");

router.get("/tasks", taskController.getAllTasks);

router.post("/task", taskController.createTask);

router.patch("/task/:id", taskController.markAsCompleted);

router.delete("/task/:id", taskController.deleteTask);

router.get("/delete-all-tasks" / taskController.deleteAllCompletedTasks);

module.exports = router;
