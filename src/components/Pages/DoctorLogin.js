import React, { useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";

function DoctorLogin({ setRole }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3168/getDoctor", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        if (response.status === 404) {
          toast.error(data.error || "Doctor not found");
        } else if (response.status === 401) {
          toast.error(data.error || "Invalid credentials");
        } else {
          toast.error("An error occurred while logging in");
        }
      } else {
        localStorage.setItem("doctorName", data.username);
        toast.success("Doctor logged in successfully");
        setRole("doctor");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("An error occurred while logging in");
    }
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h2 className="title">Doctor Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="col-md-12 input-field">
            <TextField
              label="Email"
              variant="outlined"
              className="form-control"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={handleChangeEmail}
              required
            />
          </div>
          <div className="col-md-12 input-field">
            <TextField
              label="Password"
              variant="outlined"
              className="form-control"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={handleChangePassword}
              required
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <br />
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default DoctorLogin;