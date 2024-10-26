const express = require("express");
const path = require("path");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const axios = require("axios");
const db = require("./db");

const app = express();
const PORT = 8800;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/index.html"));
});

app.get("/userDashboard/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/pages/task.html"));
});

app.use("/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const url = `https://noted-8mnl.onrender.com`;
const interval = 30000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log(
        `Reloaded at ${new Date().toISOString()}: Status Code ${
          response.status
        }`
      );
    })
    .catch((error) => {
      console.error(
        `Error reloading at ${new Date().toISOString()}:`,
        error.message
      );
    });
}

setInterval(reloadWebsite, interval);

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => {
  db.end((err) => {
    if (err) {
      console.error("Error closing the pool:", err);
    }
    console.log("Database pool closed.");
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  });
});
