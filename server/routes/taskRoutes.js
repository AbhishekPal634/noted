const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskCOntroller");

router.get("/user/:id/tasks", taskController.getTasks);
router.post("/user/tasks", taskController.addTask);
router.patch("/:id", taskController.updateTaskStatus);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
