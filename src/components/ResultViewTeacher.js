import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
const ViewMarks = ({ tab }) => {
  const [rollNumber, setRollNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [student, setStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleGetMarks = async (e) => {
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
          <button className="custom-button">←   Go Back</button>
        </Link>
      </div>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h6" align="center">
          View Marks
        </Typography>
        <form onSubmit={handleGetMarks}>
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
    </Box>
    </>
  );
};

export default ViewMarks;
