// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
// } from "@mui/material";

// const StudentRanksAndTopPerformers = () => {
//   const [studentRanks, setStudentRanks] = useState(null);
//   const [topPerformers, setTopPerformers] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);

//   useEffect(() => {
//     fetchTopPerformers();
//   }, []);

//   const fetchStudentRanks = async (rollNumber) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/students/ranks?rollNumber=${rollNumber}`
//       );
//       setStudentRanks(response.data);
//       setOpenDialog(true);
//     } catch (error) {
//       console.error("Error fetching student ranks:", error);
//     }
//   };

//   const fetchTopPerformers = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/api/students/topperformers"
//       );
//       setTopPerformers(response.data);
//     } catch (error) {
//       console.error("Error fetching top performers:", error);
//     }
//   };

//   const handleClose = () => {
//     setOpenDialog(false);
//   };

//   return (
//     <div>
//       <Typography variant="h4" align="center" gutterBottom>
//         Student Ranks and Top Performers
//       </Typography>

//       <Typography variant="h5" gutterBottom>
//         Top Performers by CGPA
//       </Typography>
//       {topPerformers && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Roll Number</TableCell>
//                 <TableCell>CGPA</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {topPerformers.topCGPA.map((student) => (
//                 <TableRow key={student.rollNumber}>
//                   <TableCell>{student.name}</TableCell>
//                   <TableCell>{student.rollNumber}</TableCell>
//                   <TableCell>{student.cgpa}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Typography variant="h5" gutterBottom>
//         Top Performers by SGPA
//       </Typography>
//       {topPerformers && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Roll Number</TableCell>
//                 <TableCell>Semester</TableCell>
//                 <TableCell>Year</TableCell>
//                 <TableCell>SGPA</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {topPerformers.topSGPA.map((student) => (
//                 <TableRow key={student.rollNumber + student.semester}>
//                   <TableCell>{student.name}</TableCell>
//                   <TableCell>{student.rollNumber}</TableCell>
//                   <TableCell>{student.semester}</TableCell>
//                   <TableCell>{student.year}</TableCell>
//                   <TableCell>{student.sgpa}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => fetchStudentRanks("2JI21CS026")}
//       >
//         Get Student Ranks
//       </Button>

//       <Dialog open={openDialog} onClose={handleClose}>
//         <DialogTitle>Student Ranks</DialogTitle>
//         <DialogContent>
//           {studentRanks && (
//             <div>
//               <Typography variant="h6">Name: {studentRanks.name}</Typography>
//               <Typography variant="h6">
//                 Roll Number: {studentRanks.rollNumber}
//               </Typography>
//               <Typography variant="h6">CGPA: {studentRanks.cgpa}</Typography>
//               <Typography variant="h6">
//                 CGPA Rank: {studentRanks.cgpaRank}
//               </Typography>

//               <Typography variant="h6" gutterBottom>
//                 Semester Ranks
//               </Typography>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Semester</TableCell>
//                       <TableCell>Year</TableCell>
//                       <TableCell>SGPA</TableCell>
//                       <TableCell>SGPA Rank</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {studentRanks.semesterRanks.map((rank) => (
//                       <TableRow key={rank.semester + rank.year}>
//                         <TableCell>{rank.semester}</TableCell>
//                         <TableCell>{rank.year}</TableCell>
//                         <TableCell>{rank.sgpa}</TableCell>
//                         <TableCell>{rank.sgpaRank}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </div>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default StudentRanksAndTopPerformers;

import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Tab,
  Box,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
const StudentDataDialog = () => {
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [toppers, setToppers] = useState([]);
  const [studentRanks, setStudentRanks] = useState(null);
  const [openToppers, setOpenToppers] = useState(false);
  const [openRanks, setOpenRanks] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleFetchToppers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/toppers`,
        { params: { semester, year } }
      );
      setToppers(response.data);
      setOpenToppers(true);
    } catch (error) {
      console.error("Error fetching toppers:", error);
    }
  };

  const handleFetchRanks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/students/ranks`,
        { params: { rollNumber } }
      );
      setStudentRanks(response.data);
      setOpenRanks(true);
    } catch (error) {
      console.error("Error fetching student ranks:", error);
    }
  };

  return (
    <>
      <div style={{ margin: "5px" }}>
        <Link to="/teacher-dashboard">
          <button className="custom-button">← Go Back</button>
        </Link>
      </div>
      {/* <Dialog open={true} onClose={() => {}}>
        <DialogTitle>Student Data</DialogTitle>
        <DialogContent> */}
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Fetch Toppers" />
        <Tab label="Fetch Student Ranks" />
      </Tabs>
      <Box p={2}>
        {tabValue === 0 && (
          <Box>
            <TextField
              label="Semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <TextField
              label="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchToppers}
              style={{ marginLeft: "10px" }}
            >
              Get Toppers
            </Button>
          </Box>
        )}
        {tabValue === 1 && (
          <Box>
            <TextField
              label="Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              style={{ marginRight: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleFetchRanks}
              style={{ marginLeft: "10px" }}
            >
              Get Student Ranks
            </Button>
          </Box>
        )}
      </Box>
      <Dialog open={openToppers} onClose={() => setOpenToppers(false)}>
        <DialogTitle>Toppers List</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Year</TableCell>
                <TableCell>SGPA</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toppers.map((topper) => (
                <TableRow key={topper._id}>
                  <TableCell>{topper.name}</TableCell>
                  <TableCell>{topper.rollNumber}</TableCell>
                  <TableCell>{topper.semester}</TableCell>
                  <TableCell>{topper.year}</TableCell>
                  <TableCell>{topper.sgpa}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenToppers(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openRanks} onClose={() => setOpenRanks(false)}>
        <DialogTitle>Student Ranks</DialogTitle>
        <DialogContent>
          {studentRanks && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Name:</strong> {studentRanks.name}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>Roll Number:</strong> {studentRanks.rollNumber}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>CGPA:</strong> {studentRanks.cgpa}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                <strong>CGPA Rank:</strong> {studentRanks.cgpaRank}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Semester</TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>SGPA</TableCell>
                    {/* <TableCell>SGPA Rank</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentRanks.semesterRanks.map((sem) => (
                    <TableRow key={`${sem.semester}-${sem.year}`}>
                      <TableCell>{sem.semester}</TableCell>
                      <TableCell>{sem.year}</TableCell>
                      <TableCell>{sem.sgpa}</TableCell>
                      {/* <TableCell>{sem.sgpaRank}</TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRanks(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {/* </DialogContent>
      </Dialog> */}
    </>
  );
};

export default StudentDataDialog;
