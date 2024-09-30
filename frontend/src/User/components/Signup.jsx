import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { message } from "antd";
import "../../style/SignUp.css";
import { useNavigate } from "react-router-dom";
import MyPage from "../../Books/pages/MyPage";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      general: "",
    });

    try {
      await axios.post(
        "http://localhost:8000/api/register/",
        formData
      );
      message.success("Your account is created successfully !");
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessages = error.response.data;
        if (
          errorMessages.includes(
            `[&#x27;choose another password, min 8 characters&#x27;]`
          )
        ) {
          message.error("choose another password, min 8 characters");
        }
        if (errorMessages.includes(`[&#x27;choose another email&#x27;]`)) {
          message.error("Choose another email");
        }
      } else {
        message.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <MyPage/>
      <div className="signIn">
        <Container className="signInModal">
          <form onSubmit={handleSubmit}>
            <h1 align="center" className="main fw-light">
              Sign Up
            </h1>
            <div className="modalText">
              <TextField
                variant="standard"
                label="Username"
                className="modalText"
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="modalText">
              <TextField
                variant="standard"
                label="Email"
                className="modalText"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="modalText">
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                name="password"
                onChange={handleChange}
                className="modalText"
                required
              />
            </div>
            <div className="modalText">
              <Button
                variant="contained"
                type="submit"
                className="modalBtn text-white"
              >
                Sign Up with E-mail
              </Button>
            </div>
            <div className="mt-4 mb-1 fw-bold text-center">
              Already have an account ?
              <Link to="/" className="btnLink">
                {" "}
                Sign In
              </Link>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default SignUp;
