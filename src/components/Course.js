// import React, { useState, useEffect } from "react";
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
// } from "@mui/material";
// import { toast } from "sonner";

// const Courses = () => {
//   const [tab, setTab] = useState(0);
//   const [semester, setSemester] = useState("");
//   const [year, setYear] = useState("");
//   const [courseCode, setCourseCode] = useState("");
//   const [courseTitle, setCourseTitle] = useState("");
//   const [credits, setCredits] = useState("");
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     // Clear the fields when the tab changes
//     setSemester("");
//     setYear("");
//     setCourseCode("");
//     setCourseTitle("");
//     setCredits("");
//   }, [tab]);

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };

//   const handleAddCourse = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("/api/courses/add-course", {
//         semester,
//         year,
//         courses: [{ courseCode, courseTitle, credits: parseInt(credits) }],
//       });

//       toast.success("Course added successfully");
//     } catch (err) {
//       toast.error(`Error adding course: ${err.response.data}`);
//     }
//   };

//   const handleGetCourses = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.get("/api/courses/get-courses", {
//         params: { semester, year },
//       });

//       setCourses(response.data);
//       toast.success("Courses retrieved successfully");
//     } catch (err) {
//       toast.error(`Error retrieving courses: ${err.response.data}`);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Tabs value={tab} onChange={handleTabChange} centered>
//         <Tab label="Add Course" />
//         <Tab label="View Courses" />
//       </Tabs>
//       <Box hidden={tab !== 0} p={3}>
//         <Typography variant="h6">Add Course</Typography>
//         <form onSubmit={handleAddCourse}>
//           <TextField
//             label="Semester"
//             value={semester}
//             onChange={(e) => setSemester(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Course Code"
//             value={courseCode}
//             onChange={(e) => setCourseCode(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Course Title"
//             value={courseTitle}
//             onChange={(e) => setCourseTitle(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Credits"
//             value={credits}
//             onChange={(e) => setCredits(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Add Course
//           </Button>
//         </form>
//       </Box>
//       <Box hidden={tab !== 1} p={3}>
//         <Typography variant="h6">View Courses</Typography>
//         <form onSubmit={handleGetCourses}>
//           <TextField
//             label="Semester"
//             value={semester}
//             onChange={(e) => setSemester(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Year"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Get Courses
//           </Button>
//         </form>
//         {courses.length > 0 && (
//           <List>
//             {courses.map((course, index) => (
//               <ListItem key={index}>
//                 <ListItemText
//                   primary={`${course.courseCode} - ${course.courseTitle}`}
//                   secondary={`Credits: ${course.credits}`}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Box>
//     </Container>
//   );
// };

// export default Courses;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Tabs,
  Tab,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material";
import { toast } from "sonner";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Courses = () => {
  const [tab, setTab] = useState(0);
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [courseInputs, setCourseInputs] = useState([
    { courseCode: "", courseTitle: "", credits: "" },
  ]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Clear the fields when the tab changes
    setSemester("");
    setYear("");
    setCourseInputs([{ courseCode: "", courseTitle: "", credits: "" }]);
  }, [tab]);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const inputs = [...courseInputs];
    inputs[index][name] = value;
    setCourseInputs(inputs);
  };

  const handleAddCourseInput = () => {
    setCourseInputs([
      ...courseInputs,
      { courseCode: "", courseTitle: "", credits: "" },
    ]);
  };

  const handleRemoveCourseInput = (index) => {
    const inputs = [...courseInputs];
    inputs.splice(index, 1);
    setCourseInputs(inputs);
  };

  const handleAddCourses = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/courses/add",
        {
          semester,
          year,
          courses: courseInputs.map((course) => ({
            courseCode: course.courseCode,
            courseTitle: course.courseTitle,
            credits: parseInt(course.credits),
          })),
        }
      );

      toast.success("Courses added successfully");
    } catch (err) {
      toast.error(`Error adding courses: ${err.response?.data || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGetCourses = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get("http://localhost:5000/api/courses/", {
        params: { semester, year },
      });

      setCourses(response.data);
      toast.success("Courses retrieved successfully");
    } catch (err) {
      toast.error(
        `Error retrieving courses: ${err.response?.data || err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ margin: "5px", position: "absolute" }}>
        <Link to="/teacher-dashboard">
          <button className="custom-button">←   Go Back</button>
        </Link>
      </div>

      <Container maxWidth="sm">
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Add Courses" />
          <Tab label="View Courses" />
        </Tabs>
        <Box hidden={tab !== 0} p={3}>
          <Typography variant="h6">Add Courses</Typography>
          <form onSubmit={handleAddCourses}>
            <TextField
              label="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            {courseInputs.map((input, index) => (
              <Box key={index} mb={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Course Code"
                      name="courseCode"
                      value={input.courseCode}
                      onChange={(e) => handleInputChange(index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Course Title"
                      name="courseTitle"
                      value={input.courseTitle}
                      onChange={(e) => handleInputChange(index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      label="Credits"
                      name="credits"
                      value={input.credits}
                      onChange={(e) => handleInputChange(index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={2} container alignItems="center">
                    {courseInputs.length > 1 && (
                      <IconButton
                        onClick={() => handleRemoveCourseInput(index)}
                      >
                        <RemoveCircleOutline color="error" />
                      </IconButton>
                    )}
                    {index === courseInputs.length - 1 && (
                      <IconButton onClick={handleAddCourseInput}>
                        <AddCircleOutline color="primary" />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </Box>
            ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Courses"}
            </Button>
          </form>
        </Box>
        <Box hidden={tab !== 1} p={3}>
          <Typography variant="h6">View Courses</Typography>
          <form onSubmit={handleGetCourses}>
            <TextField
              label="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Get Courses"}
            </Button>
          </form>
          {courses.length > 0 && (
            <List>
              {courses.map((course, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${course.courseCode} - ${course.courseTitle}`}
                    secondary={`Credits: ${course.credits}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Courses;
