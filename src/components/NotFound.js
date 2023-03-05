import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const NotFound = () => (
  <Container className="not-found">
    <br />
    <h1>404!</h1>
    <p>
      Content not found. <Link to="/">Return to posts</Link>
    </p>
  </Container>
);

export default NotFound;
