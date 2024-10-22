const db = require("../db");

exports.getTasks = (req, res) => {
    const userId = req.params.id;

    const query = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json(results);
    });
};

exports.addTask = (req, res) => {
    const { userId, taskDescription } = req.body;

    const query = "INSERT INTO tasks (user_id, task_description, status) VALUES (?, ?, 'Pending')";
    db.query(query, [userId, taskDescription], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        res.status(201).json({ message: "Task added", taskId: result.insertId });
    });
};

exports.updateTaskStatus = (req, res) => {
    const { status } = req.body;
    const taskId = req.params.id;

    const query = "UPDATE tasks SET status = ? WHERE id = ?";
    db.query(query, [status, taskId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task status updated" });
    });
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.id;

    const query = "DELETE FROM tasks WHERE id = ?";
    db.query(query, [taskId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted" });
    });
};
