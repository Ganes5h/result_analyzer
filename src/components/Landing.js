import React, { useState } from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [hovered, setHovered] = useState(null);

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      gap: "40px",
    },
    card: {
      width: "300px",
      height: "200px",
      textAlign: "center",
      transition: "transform 0.3s ease-in-out",
      backgroundColor: "#e0f7fa",
      color: "#00796b",
    },
    cardHovered: {
      transform: "scale(1.1)",
      backgroundColor: "#80deea",
    },
    cardTeacher: {
      backgroundColor: "#ffecb3",
      color: "#f57c00",
    },
    cardTeacherHovered: {
      backgroundColor: "#ffd54f",
    },
    cardStudent: {
      backgroundColor: "#c5e1a5",
      color: "#33691e",
    },
    cardStudentHovered: {
      backgroundColor: "#aed581",
    },
    link: {
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <Link
        to="/auth"
        style={styles.link}
        onMouseEnter={() => setHovered("teacher")}
        onMouseLeave={() => setHovered(null)}
      >
        <Card
          style={
            hovered === "teacher"
              ? {
                  ...styles.card,
                  ...styles.cardTeacher,
                  ...styles.cardHovered,
                  ...styles.cardTeacherHovered,
                }
              : { ...styles.card, ...styles.cardTeacher }
          }
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h4" component="h2">
                Teacher
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
      <Link
        to="/view-result-student"
        style={styles.link}
        onMouseEnter={() => setHovered("student")}
        onMouseLeave={() => setHovered(null)}
      >
        <Card
          style={
            hovered === "student"
              ? {
                  ...styles.card,
                  ...styles.cardStudent,
                  ...styles.cardHovered,
                  ...styles.cardStudentHovered,
                }
              : { ...styles.card, ...styles.cardStudent }
          }
        >
          <CardActionArea>
            <CardContent>
              <Typography variant="h4" component="h2">
                Student
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default HomePage;
