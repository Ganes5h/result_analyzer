const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const csv = require("csv-parser");
const fs = require("fs");
const { Student } = require("../models/Student");
const Course = require("../models/Course");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Helper Functions
function getGradeAndPoints(marks) {
  if (marks >= 90) return { grade: "O", gradePoints: 10 };
  if (marks >= 80) return { grade: "A+", gradePoints: 9 };
  if (marks >= 70) return { grade: "A", gradePoints: 8 };
  if (marks >= 60) return { grade: "B+", gradePoints: 7 };
  if (marks >= 55) return { grade: "B", gradePoints: 6 };
  if (marks >= 50) return { grade: "C", gradePoints: 5 };
  if (marks >= 40) return { grade: "P", gradePoints: 4 };
  return { grade: "F", gradePoints: 0 };
}

async function updateSGPARanks(semester, year) {
  const students = await Student.find({
    "semesters.semester": semester,
    "semesters.year": year,
  });
  students.sort((a, b) => {
    const aSemester = a.semesters.find(
      (s) => s.semester === semester && s.year === year
    );
    const bSemester = b.semesters.find(
      (s) => s.semester === semester && s.year === year
    );
    return bSemester.sgpa - aSemester.sgpa;
  });

  for (let i = 0; i < students.length; i++) {
    const student = students[i];
    const semesterIndex = student.semesters.findIndex(
      (s) => s.semester === semester && s.year === year
    );
    student.semesters[semesterIndex].sgpaRank = i + 1;
    await student.save();
  }
}

async function updateCGPARanks() {
  const students = await Student.find().sort({ cgpa: -1 });
  for (let i = 0; i < students.length; i++) {
    students[i].cgpaRank = i + 1;
    await students[i].save();
  }
}

// 1. Add a new student
router.post("/students", async (req, res) => {
  try {
    const { name, rollNumber, email } = req.body;
    const student = new Student({
      name,
      rollNumber,
      email,
      cgpa: 0,
      semesters: [],
    });
    await student.save();
    res.status(201).json({ message: "Student added successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Get all students
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find(
      {},
      "name rollNumber email cgpa cgpaRank"
    );
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Get a specific student
router.get("/students/:rollNumber", async (req, res) => {
  try {
    const student = await Student.findOne({
      rollNumber: req.params.rollNumber,
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Add a new course
router.post("/courses", async (req, res) => {
  try {
    const { semester, year, courses } = req.body;

    // Check if courses for the given semester and year already exist
    let courseDoc = await Course.findOne({ semester, year });

    if (!courseDoc) {
      // If courses for the semester and year do not exist, create a new document
      courseDoc = new Course({ semester, year, courses: [] });
    }

    // Push new courses into the existing or new document
    courseDoc.courses.push(...courses);
    await courseDoc.save();

    res.status(201).json({
      message: "Courses added successfully",
      courses: courseDoc.courses,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Get courses for a specific semester and year
router.get("/courses", async (req, res) => {
  try {
    const { semester, year } = req.query;

    // Validate semester and year are integers
    const parsedSemester = parseInt(semester);
    const parsedYear = parseInt(year);

    if (!Number.isInteger(parsedSemester) || !Number.isInteger(parsedYear)) {
      return res.status(400).json({ message: "Invalid semester or year" });
    }

    const courses = await Course.findOne({
      semester: parsedSemester,
      year: parsedYear,
    });

    if (!courses) {
      return res.status(404).json({ message: "Courses not found" });
    }

    res.status(200).json(courses.courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Add student marks
router.post("/marks", async (req, res) => {
  const { rollNumber, semester, year, courseMarks } = req.body;
  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const courses = await Course.findOne({ semester, year });
    if (!courses)
      return res
        .status(404)
        .json({ message: "Courses not found for the given semester and year" });

    let totalGradePoints = 0;
    let totalCredits = 0;

    const grades = courseMarks.map((mark) => {
      const course = courses.courses.find(
        (c) => c.courseCode === mark.courseCode
      );
      if (!course) throw new Error(`Course ${mark.courseCode} not found`);

      const { grade, gradePoints } = getGradeAndPoints(mark.marks);
      const creditPoints = gradePoints * course.credits;
      totalGradePoints += creditPoints;
      totalCredits += course.credits;

      return {
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        credits: course.credits,
        marks: mark.marks,
        grade,
        gradePoints,
        creditPoints,
      };
    });

    const sgpa = totalGradePoints / totalCredits;

    const semesterData = { semester, year, grades, sgpa };

    const existingSemesterIndex = student.semesters.findIndex(
      (sem) => sem.semester === semester && sem.year === year
    );

    if (existingSemesterIndex !== -1) {
      student.semesters[existingSemesterIndex] = semesterData;
    } else {
      student.semesters.push(semesterData);
    }

    student.cgpa =
      student.semesters.reduce((sum, sem) => sum + sem.sgpa, 0) /
      student.semesters.length;

    await student.save();

    await updateSGPARanks(semester, year);
    await updateCGPARanks();

    res
      .status(200)
      .json({ message: "Student marks added successfully", semesterData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. Get student marks
router.get("/marks", async (req, res) => {
  const { rollNumber, semester, year } = req.query;
  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const semesterData = student.semesters.find(
      (sem) =>
        sem.semester === parseInt(semester) && sem.year === parseInt(year)
    );
    if (!semesterData)
      return res.status(404).json({ message: "Semester data not found" });

    res.status(200).json({
      name: student.name,
      rollNumber: student.rollNumber,
      semesterData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. Get student ranks
router.get("/ranks", async (req, res) => {
  const { rollNumber } = req.query;
  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const ranks = {
      name: student.name,
      rollNumber: student.rollNumber,
      cgpa: student.cgpa,
      cgpaRank: student.cgpaRank,
      semesterRanks: student.semesters.map((sem) => ({
        semester: sem.semester,
        year: sem.year,
        sgpa: sem.sgpa,
        sgpaRank: sem.sgpaRank,
      })),
    };

    res.status(200).json(ranks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. Get top performers
router.get("/topperformers", async (req, res) => {
  try {
    const topCGPA = await Student.find({}).sort({ cgpa: -1 }).limit(10);
    const topSGPA = await Student.aggregate([
      { $unwind: "$semesters" },
      { $sort: { "semesters.sgpa": -1 } },
      { $limit: 10 },
      {
        $project: {
          name: 1,
          rollNumber: 1,
          semester: "$semesters.semester",
          year: "$semesters.year",
          sgpa: "$semesters.sgpa",
        },
      },
    ]);

    res.status(200).json({ topCGPA, topSGPA });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/import-students', upload.single('file'), async (req, res) => {
    const filePath = req.file.path;
  
    if (!filePath) {
      return res.status(400).json({ error: 'File path is required' });
    }
  
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          const { semester, year } = results[0];
          const courses = await Course.findOne({ semester, year });
  
          if (!courses) {
            return res.status(404).json({
              message: 'Courses not found for the given semester and year',
            });
          }
  
          for (const row of results) {
            const { rollNumber, name, email } = row;
            const courseMarks = courses.courses.map((course) => ({
              courseCode: course.courseCode,
              marks: parseInt(row[course.courseCode]),
            }));
  
            let student = await Student.findOne({ rollNumber });
            if (!student) {
              student = new Student({ rollNumber, name, email, semesters: [] });
            }
  
            let totalGradePoints = 0;
            let totalCredits = 0;
  
            const grades = courseMarks.map((mark) => {
              const course = courses.courses.find(
                (c) => c.courseCode === mark.courseCode
              );
  
              const { grade, gradePoints } = getGradeAndPoints(mark.marks);
              const creditPoints = gradePoints * course.credits;
              totalGradePoints += creditPoints;
              totalCredits += course.credits;
  
              return {
                courseCode: course.courseCode,
                courseTitle: course.courseTitle,
                credits: course.credits,
                marks: mark.marks,
                grade,
                gradePoints,
                creditPoints,
              };
            });
  
            const sgpa = totalGradePoints / totalCredits;
            const semesterData = { semester, year, grades, sgpa };
  
            const existingSemesterIndex = student.semesters.findIndex(
              (sem) => sem.semester === semester && sem.year === year
            );
  
            if (existingSemesterIndex !== -1) {
              student.semesters[existingSemesterIndex] = semesterData;
            } else {
              student.semesters.push(semesterData);
            }
  
            student.cgpa =
              student.semesters.reduce((sum, sem) => sum + sem.sgpa, 0) /
              student.semesters.length;
  
            await student.save();
          }
  
          await updateSGPARanks(semester, year);
          await updateCGPARanks();
  
          res.status(200).json({ message: 'Students imported successfully' });
        } catch (error) {
          res.status(500).json({ error: error.message });
        } finally {
          fs.unlinkSync(filePath); // Clean up the uploaded file
        }
      });
  });

module.exports = router;
