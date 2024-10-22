const express = require("express");
const path = require("path");
const  cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = 8800;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../client')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/index.html"));
});

app.get("/userDashboard/:id", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/pages/task.html"));
});

app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

