// import React, { useState } from "react";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Container,
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   Table,
//   TableContainer,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@mui/material";
// import { toast } from "sonner";

// const StudentManagement = () => {
//   const [tab, setTab] = useState(0);
//   const [rollNumber, setRollNumber] = useState("");
//   const [student, setStudent] = useState(null);
//   const [semester, setSemester] = useState("");
//   const [year, setYear] = useState("");
//   const [courseCode, setCourseCode] = useState("");
//   const [marks, setMarks] = useState("");
//   const [openDialog, setOpenDialog] = useState(false); // State for dialog visibility

//   const apiUrl = "http://localhost:5000/api/students"; // Replace with your API URL

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//     resetFormFields();
//   };

//   const resetFormFields = () => {
//     setRollNumber("");
//     setStudent(null);
//     setSemester("");
//     setYear("");
//     setCourseCode("");
//     setMarks("");
//   };

//   const handleAddStudent = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${apiUrl}/students`, {
//         name: e.target.name.value,
//         rollNumber: e.target.rollNumber.value,
//         email: e.target.email.value,
//         semester,
//         year,
//       });

//       toast.success("Student added successfully");
//       resetFormFields();
//     } catch (err) {
//       toast.error(`Error adding student: ${err.response.data}`);
//     }
//   };

//   const handleGetStudent = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get(`${apiUrl}/students/${rollNumber}`);

//       setStudent(response.data);
//     } catch (err) {
//       toast.error(`Error retrieving student: ${err.response.data}`);
//     }
//   };

//   const handleAddMarks = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(`${apiUrl}/marks`, {
//         rollNumber,
//         semester,
//         year,
//         courseMarks: [{ courseCode, marks }],
//       });

//       toast.success("Marks added successfully");
//       setCourseCode("");
//       setMarks("");
//     } catch (err) {
//       toast.error(`Error adding marks: ${err.response.data}`);
//     }
//   };

//   const handleGetMarks = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get(`${apiUrl}/marks`, {
//         params: { rollNumber, semester, year },
//       });

//       setStudent(response.data);
//       setOpenDialog(true); // Open dialog on successful retrieval
//     } catch (err) {
//       toast.error(`Error retrieving marks: ${err.response.data}`);
//     }
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <Container maxWidth="sm">
//       <Tabs value={tab} onChange={handleTabChange} centered>
//         <Tab label="Add Student" />
//         <Tab label="View Student" />
//         <Tab label="Add Marks" />
//         <Tab label="View Marks" />
//       </Tabs>
//       <Box hidden={tab !== 0} p={3}>
//         <Typography variant="h6">Add Student</Typography>
//         <form onSubmit={handleAddStudent}>
//           <TextField
//             name="name"
//             label="Name"
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             name="rollNumber"
//             label="Roll Number"
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             name="email"
//             label="Email"
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Add Student
//           </Button>
//         </form>
//       </Box>
//       <Box hidden={tab !== 1} p={3}>
//         <Typography variant="h6">View Student</Typography>
//         <form onSubmit={handleGetStudent}>
//           <TextField
//             label="Enter Roll Number"
//             value={rollNumber}
//             onChange={(e) => setRollNumber(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Get Student
//           </Button>
//         </form>
//         {student && (
//           <Box mt={3}>
//             <Typography variant="subtitle1">Student Details:</Typography>
//             <List>
//               <ListItem button onClick={() => setOpenDialog(true)}>
//                 <ListItemText primary={`Name: ${student.name}`} />
//               </ListItem>
//             </List>
//           </Box>
//         )}
//       </Box>
//       <Box hidden={tab !== 2} p={3}>
//         <Typography variant="h6">Add Marks</Typography>
//         <form onSubmit={handleAddMarks}>
//           <TextField
//             label="Roll Number"
//             value={rollNumber}
//             onChange={(e) => setRollNumber(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Semester"
//             value={semester}
//             onChange={(e) => setSemester(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Course Code"
//             value={courseCode}
//             onChange={(e) => setCourseCode(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Marks"
//             value={marks}
//             onChange={(e) => setMarks(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Add Marks
//           </Button>
//         </form>
//       </Box>
//       <Box hidden={tab !== 3} p={3}>
//         <Typography variant="h6">View Marks</Typography>
//         <form onSubmit={handleGetMarks}>
//           <TextField
//             label="Roll Number"
//             value={rollNumber}
//             onChange={(e) => setRollNumber(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Semester"
//             value={semester}
//             onChange={(e) => setSemester(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Get Marks
//           </Button>
//         </form>
//         {student && student.semesterData && (
//           <Dialog open={openDialog} onClose={handleCloseDialog}>
//             <DialogTitle>Student Details</DialogTitle>
//             <DialogContent>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Course Code</TableCell>
//                       <TableCell>Course Title</TableCell>
//                       <TableCell align="center">Marks</TableCell>
//                       <TableCell align="center">Grade</TableCell>
//                       {/* <TableCell align="center">SGPA</TableCell> */}
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {student.semesterData.grades.map((grade, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{grade.courseCode}</TableCell>
//                         <TableCell>{grade.courseTitle}</TableCell>
//                         <TableCell align="center">{grade.marks}</TableCell>
//                         <TableCell align="center">{grade.grade}</TableCell>
//                         {/* <TableCell align="center">
//                           {student.semesterData.sgpa}
//                         </TableCell> */}
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                   <h6 align="center">
//                     SGPA : {student.semesterData.sgpa}
//                   </h6>
//                 </Table>
//               </TableContainer>
//             </DialogContent>
//           </Dialog>
//         )}
//       </Box>
//     </Container>
//   );
// };
// export default StudentManagement;

import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { toast } from "sonner";

import { Link } from "react-router-dom";
const StudentManagement = () => {
  const [tab, setTab] = useState(0);
  const [rollNumber, setRollNumber] = useState("");
  const [student, setStudent] = useState(null);
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [courses, setCourses] = useState([]);
  const [marks, setMarks] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const apiUrl = "http://localhost:5000/api"; // Replace with your API URL

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    resetFormFields();
  };

  const resetFormFields = () => {
    setRollNumber("");
    setStudent(null);
    setSemester("");
    setYear("");
    setCourses([]);
    setMarks({});
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/api/students/students`,
        {
          name: e.target.name.value,
          rollNumber: e.target.rollNumber.value,
          email: e.target.email.value,
          // semester,
          // year,
        }
      );

      toast.success("Student added successfully");
      resetFormFields();
    } catch (err) {
      toast.error(`Error adding student: ${err.response.data}`);
    }
  };

  const handleGetCourses = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${apiUrl}/courses`, {
        params: { semester, year },
      });

      setCourses(response.data);
    } catch (err) {
      toast.error(`Error retrieving courses: ${err.response.data}`);
    }
  };

  const handleAddMarks = async (e) => {
    e.preventDefault();

    try {
      const courseMarks = Object.keys(marks).map((courseCode) => ({
        courseCode,
        marks: marks[courseCode],
      }));

      const response = await axios.post(
        `http://localhost:5000/api/students/marks`,
        {
          rollNumber,
          semester,
          year,
          courseMarks,
        }
      );

      toast.success("Marks added successfully");
      resetFormFields();
    } catch (err) {
      toast.error(`Error adding marks: ${err.response.data}`);
    }
  };

  const handleMarksChange = (courseCode, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [courseCode]: value,
    }));
  };

  const handleGetStudent = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/students/${rollNumber}`
      );
      setStudent(response.data);
      toast.success("Student retrieved successfully");
    } catch (err) {
      toast.error(`Error retrieving student: ${err.response.data}`);
    }
  };

  const handleGetMarkss = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/marks`,
        {
          params: { rollNumber, semester, year },
        }
      );

      setStudent(response.data);
      setOpenDialog(true);
    } catch (err) {
      toast.error(`Error retrieving marks: ${err.response.data}`);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <div style={{ margin: "5px", position: "absolute" }}>
        <Link to="/teacher-dashboard">
          <button className="custom-button">← Go Back</button>
        </Link>
      </div>
      <Container maxWidth="sm">
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Add Student" />
          <Tab label="View Student" />
          <Tab label="Add Marks" />
          <Tab label="View Marks" />
        </Tabs>
        <Box hidden={tab !== 0} p={3}>
          <Typography variant="h6">Add Student</Typography>
          <form onSubmit={handleAddStudent}>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="rollNumber"
              label="Roll Number"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              required
            />
            {/* <TextField
              label="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
              required
            /> */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Student
            </Button>
          </form>
        </Box>
        <Box hidden={tab !== 1} p={3}>
          <Typography variant="h6">View Student</Typography>
          <form onSubmit={handleGetStudent}>
            <TextField
              label="Enter Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Get Student
            </Button>
          </form>
          {student && (
            <Box mt={3}>
              <Typography variant="h6">Student Details</Typography>
              <Typography>Name: {student.name}</Typography>
              <Typography>Roll Number: {student.rollNumber}</Typography>
              <Typography>Email: {student.email}</Typography>
              <Typography>
                Semester: {student.semesterData?.semester}
              </Typography>
              <Typography>Year: {student.semesterData?.year}</Typography>
              <Typography>Grades:</Typography>
              {student.semesterData?.grades?.map((grade, index) => (
                <Typography key={index}>
                  {grade.courseTitle} ({grade.courseCode}): {grade.marks} -{" "}
                  {grade.grade}
                </Typography>
              ))}
            </Box>
          )}
        </Box>
        <Box hidden={tab !== 2} p={3}>
          <Typography variant="h6">Add Marks</Typography>
          <form onSubmit={handleAddMarks}>
            <TextField
              label="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button
              onClick={handleGetCourses}
              variant="contained"
              color="primary"
              fullWidth
            >
              Get Courses
            </Button>
            {courses.map((course) => (
              <TextField
                key={course.courseCode}
                label={course.courseTitle}
                value={marks[course.courseCode] || ""}
                onChange={(e) =>
                  handleMarksChange(course.courseCode, e.target.value)
                }
                fullWidth
                margin="normal"
                required
              />
            ))}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Marks
            </Button>
          </form>
        </Box>
        <Box hidden={tab !== 3} p={3}>
          <Typography variant="h6">View Marks</Typography>
          <form onSubmit={handleGetMarkss}>
            <TextField
              label="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Get Marks
            </Button>
          </form>
          {student && (
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth
            >
              <DialogTitle>Student Marks</DialogTitle>
              <DialogContent>
                <Typography>Name: {student.name}</Typography>
                <Typography>Roll Number: {student.rollNumber}</Typography>
                <Typography>
                  Semester: {student.semesterData?.semester}
                </Typography>
                <Typography>Year: {student.semesterData?.year}</Typography>
                <Typography>SGPA: {student.semesterData?.sgpa}</Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Course Code</TableCell>
                        <TableCell>Course Title</TableCell>
                        <TableCell>Marks</TableCell>
                        <TableCell>Grade</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {student.semesterData?.grades?.map((grade, index) => (
                        <TableRow key={index}>
                          <TableCell>{grade.courseCode}</TableCell>
                          <TableCell>{grade.courseTitle}</TableCell>
                          <TableCell>{grade.marks}</TableCell>
                          <TableCell>{grade.grade}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContent>
            </Dialog>
          )}
        </Box>
      </Container>
    </>
  );
};

export default StudentManagement;
