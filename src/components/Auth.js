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
//   CircularProgress,
//   IconButton,
//   Grid,
// } from "@mui/material";
// import { toast } from "sonner";
// import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

// const Courses = () => {
//   const [tab, setTab] = useState(0);
//   const [semester, setSemester] = useState("");
//   const [year, setYear] = useState("");
//   const [courseInputs, setCourseInputs] = useState([
//     { courseCode: "", courseTitle: "", credits: "" },
//   ]);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Clear the fields when the tab changes
//     setSemester("");
//     setYear("");
//     setCourseInputs([{ courseCode: "", courseTitle: "", credits: "" }]);
//   }, [tab]);

//   const handleTabChange = (event, newValue) => {
//     setTab(newValue);
//   };

//   const handleInputChange = (index, event) => {
//     const { name, value } = event.target;
//     const inputs = [...courseInputs];
//     inputs[index][name] = value;
//     setCourseInputs(inputs);
//   };

//   const handleAddCourseInput = () => {
//     setCourseInputs([
//       ...courseInputs,
//       { courseCode: "", courseTitle: "", credits: "" },
//     ]);
//   };

//   const handleRemoveCourseInput = (index) => {
//     const inputs = [...courseInputs];
//     inputs.splice(index, 1);
//     setCourseInputs(inputs);
//   };

//   const handleAddCourses = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/courses/add",
//         {
//           semester,
//           year,
//           courses: courseInputs.map((course) => ({
//             courseCode: course.courseCode,
//             courseTitle: course.courseTitle,
//             credits: parseInt(course.credits),
//           })),
//         }
//       );

//       toast.success("Courses added successfully");
//     } catch (err) {
//       toast.error(`Error adding courses: ${err.response?.data || err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGetCourses = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.get("http://localhost:5000/api/courses/", {
//         params: { semester, year },
//       });

//       setCourses(response.data);
//       toast.success("Courses retrieved successfully");
//     } catch (err) {
//       toast.error(
//         `Error retrieving courses: ${err.response?.data || err.message}`
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Tabs value={tab} onChange={handleTabChange} centered>
//         <Tab label="Add Courses" />
//         <Tab label="View Courses" />
//       </Tabs>
//       <Box hidden={tab !== 0} p={3}>
//         <Typography variant="h6">Add Courses</Typography>
//         <form onSubmit={handleAddCourses}>
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
//           {courseInputs.map((input, index) => (
//             <Box key={index} mb={2}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     label="Course Code"
//                     name="courseCode"
//                     value={input.courseCode}
//                     onChange={(e) => handleInputChange(index, e)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={4}>
//                   <TextField
//                     label="Course Title"
//                     name="courseTitle"
//                     value={input.courseTitle}
//                     onChange={(e) => handleInputChange(index, e)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={2}>
//                   <TextField
//                     label="Credits"
//                     name="credits"
//                     value={input.credits}
//                     onChange={(e) => handleInputChange(index, e)}
//                     fullWidth
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={2} container alignItems="center">
//                   {courseInputs.length > 1 && (
//                     <IconButton onClick={() => handleRemoveCourseInput(index)}>
//                       <RemoveCircleOutline color="error" />
//                     </IconButton>
//                   )}
//                   {index === courseInputs.length - 1 && (
//                     <IconButton onClick={handleAddCourseInput}>
//                       <AddCircleOutline color="primary" />
//                     </IconButton>
//                   )}
//                 </Grid>
//               </Grid>
//             </Box>
//           ))}
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : "Add Courses"}
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
//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : "Get Courses"}
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
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/auth/authSlice";
import { TextField, Button, Container, Tabs, Tab, Box } from "@mui/material";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const AuthTabs = () => {
  const [tab, setTab] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    // Clear the fields when the tab changes
    setUsername("");
    setEmail("");
    setPassword("");
  }, [tab]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Login successful!");
      navigate("/teacher-dashboard");
    } catch (err) {
      toast.error(`Login failed: ${err.message}`);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser({ username, email, password })).unwrap();
      toast.success("Registration successful!");
    } catch (err) {
      toast.error(`Registration failed: ${err.message}`);
    }
  };

  return (
    <>

      <Container maxWidth="sm">
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <Box hidden={tab !== 0} p={3}>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
          {authStatus === "loading" && <p>Loading...</p>}
        </Box>
        <Box hidden={tab !== 1} p={3}>
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </form>
          {authStatus === "loading" && <p>Loading...</p>}
        </Box>
      </Container>
    </>
  );
};

export default AuthTabs;
