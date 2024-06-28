const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  credits: { type: Number, required: true },
  marks: { type: Number, required: true },
  grade: { type: String, required: true },
  gradePoints: { type: Number, required: true },
  creditPoints: { type: Number, required: true },
});

const semesterSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
  year: { type: Number, required: true },
  grades: [gradeSchema],
  sgpa: { type: Number, required: true },
  sgpaRank: { type: Number },
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  semesters: [semesterSchema],
  cgpa: { type: Number, required: true },
  cgpaRank: { type: Number },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
