import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaPinterest,
} from "react-icons/fa";
import "../../style/Footer.css";
import { Divider } from "@mui/material";

export default function Footer() {
  return (
    <div className="bg-dark text-white container-fluid">
      <Container className="footer">
        <Container>
          <br></br>
          <h1 className="mb-3">
            ReadFlow{" "}
            <span>
              <FaInstagram className="icon" />
            </span>
            <span>
              <FaTwitter className="icon" />
            </span>
            <span>
              <FaFacebook className="icon" />
            </span>
            <span>
              <FaPinterest className="icon" />
            </span>
          </h1>
          <Divider className="bg-white mt-3" />
          <Row className="mt-3">
            <Col sm={4}>
              <h3>About Us</h3>
              <p>readflow provides wide range of books at great discount.</p>
            </Col>
            <Col sm={4}>
              <h3>Company</h3>
              <ul className="list-unstyled">
                <li className="li-hover-animation">About</li>
                <li className="li-hover-animation">Privacy Policy</li>
                <li className="li-hover-animation">Terms of Service</li>
              </ul>
            </Col>

            <Col sm={4}>
              <h3>Contact Us</h3>
              <ul className="list-unstyled">
                <li className="li-hover-animation">+91 7016509214</li>
                <li className="li-hover-animation">divyangkuntar@gmail.com</li>
              </ul>
            </Col>
          </Row>
          <Container className="p-3">
            © 2024 readflow. All rights reserved.
          </Container>
        </Container>
      </Container>
    </div>
  );
}
