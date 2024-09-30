import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { message } from "antd";
import Cookies from "js-cookie";
import SignUp from "./Signup";
import { useNavigate } from "react-router-dom";
import MyPage from "../../Books/pages/MyPage";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        formData
      );
      const { access } = response.data;
      Cookies.set("jwt_token", access);
      message.success("Login Successfull!")
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
      message.error("Don't have an account? SignUp")
    }
  };

  return (
    <div>
      <MyPage/>
      <div className="signIn">
        <Container className="signInModal">
          <form onSubmit={handleSubmit}>
            <h2 align="center" className="main fw-light">
              Login
            </h2>
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
                id="standard"
                className="modalText"
                label="Password"
                type="password"
                // autoComplete="current-password"
                variant="standard"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="modalText">
              <Button
                variant="contained"
                className="modalBtn text-white"
                type="submit"
              >
                Sign In with E-mail
              </Button>
            </div>
            <div className="mt-4 mb-1 fw-bold text-center">
              Don't Have an Account ?
              <Link to="/signup" element={<SignUp />} className="btnLink">
                Sign Up
              </Link>
            </div>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default Login;
