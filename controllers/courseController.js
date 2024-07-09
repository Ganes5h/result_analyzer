const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  const { semester, year, courses } = req.body;

  try {
    // Create a new document for semester and year if it doesn't exist
    let courseDoc = await Course.findOne({ semester, year });

    if (!courseDoc) {
      courseDoc = new Course({
        semester,
        year,
        courses: [],
      });
    }

    // Add new courses to the existing document
    courses.forEach((course) => {
      courseDoc.courses.push({
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        credits: course.credits,
      });
    });

    await courseDoc.save();

    res.json({ msg: "Courses added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getCourses = async (req, res) => {
  const { semester, year } = req.query;

  try {
    const courses = await Course.findOne({ semester, year });

    if (!courses) {
      return res.status(404).json({ msg: "Courses not found" });
    }

    res.json(courses.courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
