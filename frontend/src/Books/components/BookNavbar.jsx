import React, { Fragment, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../../style/BookNavbar.css";
import { GiBookmarklet } from "react-icons/gi";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

export default function BookNav() {
  const [query, setQuery] = useState("");
  const [userProfile, setUserProfile] = useState({});
  const [flag, setFlag] = useState(false);
  const token = Cookies.get("jwt_token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/user/",
          {
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        console.log(response);
        setUserProfile(response.data.user);
        setFlag(true);
      } catch (error) {
        setFlag(false);
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    setUserProfile({});
  };

  return (
    <Fragment>
      <Navbar expand="lg" className="navHome">
        <Container className="main">
          <Navbar.Brand href="/home" className="text-white">
            <GiBookmarklet className="me-2" />
            ReadFlow
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Add Buy List link here */}
             
            </Nav>
            <Form onSubmit={handleSubmit} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search for books"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-field"
              />
              {query === "" || query === " " ? (
                <Link to={`/`}>
                  {console.log("hello")}
                  <button className="btn log-btn mx-2" type="submit">
                    Search
                  </button>
                </Link>
                
                
              ) : (
                <Link to={`/search/${query}`}>
                  <button className="btn log-btn mx-2" type="submit">
                    Search
                  </button>
                </Link>
                
              )}
              <Link to={`/buylist`}>
                  {console.log("hello")}
                  <button className="btn log-btn mx-2" type="submit">
                    Wishlist
                  </button>
                </Link>
            </Form>
          </Navbar.Collapse>
          {flag ? (
            <Link to="/">
              <Button
                variant=""
                className="log-btn"
                onClick={() => handleLogout()}
              >
                Log Out{" "}
                <span className="text-decoration-underline fw-bold">
                  {userProfile.username}
                </span>
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="" className="log-btn">
                Sign In
              </Button>
            </Link>
          )}
        </Container>
      </Navbar>
    </Fragment>
  );
}
