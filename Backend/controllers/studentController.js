const Student = require("../models/Student");
const Course = require("../models/Course");

const getGradeAndPoints = (marks) => {
  if (marks >= 90) return { grade: "O", gradePoints: 10 };
  if (marks >= 80) return { grade: "A+", gradePoints: 9 };
  if (marks >= 70) return { grade: "A", gradePoints: 8 };
  if (marks >= 60) return { grade: "B+", gradePoints: 7 };
  if (marks >= 55) return { grade: "B", gradePoints: 6 };
  if (marks >= 50) return { grade: "C", gradePoints: 5 };
  if (marks >= 40) return { grade: "P", gradePoints: 4 };
  return { grade: "F", gradePoints: 0 };
};

exports.addStudentMarks = async (req, res) => {
  const { rollNumber, semester, year, marks } = req.body;

  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(404).json({ msg: "Student not found" });

    const courses = await Course.find({ semester, year });

    if (courses.length !== marks.length) {
      return res.status(400).json({ msg: "Number of marks does not match number of courses" });
    }

    let totalGradePoints = 0;
    let totalCredits = 0;
    const grades = marks.map((mark, index) => {
      const { grade, gradePoints } = getGradeAndPoints(mark.marks);
      const creditPoints = gradePoints * courses[index].credits;
      totalGradePoints += creditPoints;
      totalCredits += courses[index].credits;

      return {
        courseCode: courses[index].courseCode,
        marks: mark.marks,
        grade,
        gradePoints,
        creditPoints,
      };
    });

    const sgpa = totalGradePoints / totalCredits;

    const semesterData = { semester, year, grades, sgpa };
    student.semesters.push(semesterData);

    student.cgpa =
      student.semesters.reduce((sum, sem) => sum + sem.sgpa, 0) /
      student.semesters.length;

    await student.save();

    res.json({ msg: "Student marks added successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getStudentMarks = async (req, res) => {
    const { rollNumber, semester, year } = req.query;
  
    try {
      const student = await Student.findOne({ rollNumber });
      if (!student) return res.status(404).json({ msg: "Student not found" });
  
      const semesterData = student.semesters.find(
        (sem) =>
          sem.semester === parseInt(semester) && sem.year === parseInt(year)
      );
      if (!semesterData)
        return res.status(404).json({ msg: "Semester data not found" });
  
      res.json({ student, semesterData });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  };
