// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   semester: { type: Number, required: true },
//   year: { type: Number, required: true },
//   courses: [
//     {
//       courseCode: { type: String, required: true },
//       courseTitle: { type: String, required: true },
//       credits: { type: Number, required: true },
//     },
//   ],
// });

// module.exports = mongoose.model("Course", courseSchema);
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  semester: { type: Number, required: true },
  year: { type: Number, required: true },
  courses: [
    {
      courseCode: { type: String, required: true },
      courseTitle: { type: String, required: true },
      credits: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
