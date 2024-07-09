// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const morgan = require("morgan");
// const bodyParser = require("body-parser");

// // Load environment variables from .env file
// dotenv.config();

// // Connect to database
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Simple route to verify the server is running
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// // Import routes
// const authRoutes = require("./routes/authRoutes");
// // const studentRoutes = require("./routes/studentRoutes");
// // const semesterRoutes = require("./routes/semesterRoutes");
// // const courseRoutes = require("./routes/courseRoutes.js");
// // const gradeRoutes = require("./routes/gradeRoutes");

// // Use routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/students", studentRoutes);
// // app.use("/api/semesters", semesterRoutes);
// // app.use("/api/courses", courseRoutes);
// // app.use("/api/grades", gradeRoutes);
// app.use("/api/auth", authRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Load environment variables from .env file
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

// Use routes
app.use("/api/auth",  require("./routes/authRoutes"));
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
