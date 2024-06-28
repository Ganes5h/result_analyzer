const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
// const authMiddleware = require("../middleware/authMiddleware");

// Add a new course
router.post("/add",courseController.addCourse);

// Get courses by semester and year
router.get("/", courseController.getCourses);

module.exports = router;
