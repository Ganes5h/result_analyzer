// import React, { useState } from "react";
// import {
//   Card,
//   CardActionArea,
//   CardContent,
//   Typography,
//   Box,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   const [hovered, setHovered] = useState(null);

//   const styles = {
//     container: {
//       display: "grid",
//       gridTemplateColumns: "repeat(2, auto)",
//       gap: "20px",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       textAlign: "center",
//     },
//     card: {
//       width: "250px",
//       transition: "transform 0.3s ease-in-out",
//     },
//     cardHovered: {
//       transform: "scale(1.1)",
//     },
//     link: {
//       textDecoration: "none",
//     },
//   };

//   const handleMouseEnter = (card) => {
//     setHovered(card);
//   };

//   const handleMouseLeave = () => {
//     setHovered(null);
//   };

//   return (
//     <Box style={styles.container}>
//       <Link
//         to="/courses"
//         style={styles.link}
//         onMouseEnter={() => handleMouseEnter("courses")}
//         onMouseLeave={handleMouseLeave}
//       >
//         <Card
//           style={
//             hovered === "courses"
//               ? { ...styles.card, ...styles.cardHovered }
//               : styles.card
//           }
//         >
//           <CardActionArea>
//             <CardContent>
//               <Typography variant="h5" component="h2">
//                 Courses
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </Link>
//       <Link
//         to="/student"
//         style={styles.link}
//         onMouseEnter={() => handleMouseEnter("student")}
//         onMouseLeave={handleMouseLeave}
//       >
//         <Card
//           style={
//             hovered === "student"
//               ? { ...styles.card, ...styles.cardHovered }
//               : styles.card
//           }
//         >
//           <CardActionArea>
//             <CardContent>
//               <Typography variant="h5" component="h2">
//                 Student Details
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </Link>
//       <Link
//         to="/view-result"
//         style={styles.link}
//         onMouseEnter={() => handleMouseEnter("viewResult")}
//         onMouseLeave={handleMouseLeave}
//       >
//         <Card
//           style={
//             hovered === "viewResult"
//               ? { ...styles.card, ...styles.cardHovered }
//               : styles.card
//           }
//         >
//           <CardActionArea>
//             <CardContent>
//               <Typography variant="h5" component="h2">
//                 View Result
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </Link>
//       <Link
//         to="/toppers"
//         style={styles.link}
//         onMouseEnter={() => handleMouseEnter("toppers")}
//         onMouseLeave={handleMouseLeave}
//       >
//         <Card
//           style={
//             hovered === "toppers"
//               ? { ...styles.card, ...styles.cardHovered }
//               : styles.card
//           }
//         >
//           <CardActionArea>
//             <CardContent>
//               <Typography variant="h5" component="h2">
//                 Get Toppers
//               </Typography>
//             </CardContent>
//           </CardActionArea>
//         </Card>
//       </Link>
//     </Box>
//   );
// };

// export default HomePage;
import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const HomePage = () => {
  const [hovered, setHovered] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(2, auto)",
      gap: "20px",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      textAlign: "center",
    },
    card: {
      width: "250px",
      transition: "transform 0.3s ease-in-out",
    },
    cardHovered: {
      transform: "scale(1.1)",
    },
    link: {
      textDecoration: "none",
    },
    buttonContainer: {
      gridColumn: "span 2",
      marginTop: "20px",
    },
    button: {
      margin: "10px",
    },
  };

  const handleMouseEnter = (card) => {
    setHovered(card);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      toast.error("Please select a CSV file to import.");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/students/import-students",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Error importing students. Please try again later.");
    }

    setOpenDialog(false);
  };

  const handleDownloadFormat = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = process.env.PUBLIC_URL + "/student_import_format.csv"; // Corrected path using PUBLIC_URL
    downloadLink.download = "student_import_format.csv";
    downloadLink.click();
  };

  return (
    <>
      <div style={{ margin: "5px", position: "absolute" }}>
        <Link to="/">
          <button className="custom-button">← Go Back</button>
        </Link>
      </div>

      <Box style={styles.container}>
        <Link
          to="/courses"
          style={styles.link}
          onMouseEnter={() => handleMouseEnter("courses")}
          onMouseLeave={handleMouseLeave}
        >
          <Card
            style={
              hovered === "courses"
                ? { ...styles.card, ...styles.cardHovered }
                : styles.card
            }
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Courses
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link
          to="/student"
          style={styles.link}
          onMouseEnter={() => handleMouseEnter("student")}
          onMouseLeave={handleMouseLeave}
        >
          <Card
            style={
              hovered === "student"
                ? { ...styles.card, ...styles.cardHovered }
                : styles.card
            }
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Student Details
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link
          to="/view-result"
          style={styles.link}
          onMouseEnter={() => handleMouseEnter("viewResult")}
          onMouseLeave={handleMouseLeave}
        >
          <Card
            style={
              hovered === "viewResult"
                ? { ...styles.card, ...styles.cardHovered }
                : styles.card
            }
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="h2">
                  View Result
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Link
          to="/toppers"
          style={styles.link}
          onMouseEnter={() => handleMouseEnter("toppers")}
          onMouseLeave={handleMouseLeave}
        >
          <Card
            style={
              hovered === "toppers"
                ? { ...styles.card, ...styles.cardHovered }
                : styles.card
            }
          >
            <CardActionArea>
              <CardContent>
                <Typography variant="h5" component="h2">
                  Get Toppers
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
        <Box style={styles.buttonContainer}>
          {/* <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadFormat}
          style={styles.button}
        >
          Download Format
        </Button> */}
          <Button
            variant="contained"
            color="primary"
            component="a"
            href={process.env.PUBLIC_URL + "/student_import_format.csv"}
            download="student_import_format.csv"
            style={styles.button}
          >
            Download Format
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleDialogOpen}
            style={styles.button}
          >
            Import Bulk Students
          </Button>
        </Box>

        {/* File Upload Dialog */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Import Bulk Students</DialogTitle>
          <DialogContent>
            <input type="file" onChange={handleFileChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button
              onClick={handleUploadFile}
              variant="contained"
              color="primary"
            >
              Upload
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default HomePage;
