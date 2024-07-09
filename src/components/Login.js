// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../features/auth/authSlice";
// import { TextField, Button, Container } from "@mui/material";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const authStatus = useSelector((state) => state.auth.status);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const user = await dispatch(loginUser({ email, password })).unwrap();
//       // Upon successful login, navigate to teacher dashboard
//       if (user) {
//         navigate("/teacher-dashboard");
//         toast.success("Login successful!");
//       }
//     } catch (err) {
//       toast.error(`Login failed: ${err.message}`);
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <TextField
//           label="Email"
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Login
//         </Button>
//       </form>
//       {authStatus === "loading" && <p>Loading...</p>}
//     </Container>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { TextField, Button, Container } from "@mui/material";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await dispatch(loginUser({ email, password })).unwrap();
      if (user) {
        navigate("/teacher-dashboard"); // Navigate to teacher-dashboard upon successful login
        toast.success("Login successful!");
      } else {
        toast.error("Login failed: Invalid credentials.");
      }
    } catch (err) {
      toast.error(`Login failed: ${err.message}`);
    }
  };

  return (
    <Container maxWidth="sm">
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
    </Container>
  );
};

export default Login;
