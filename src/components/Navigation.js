import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { GiHollowCat } from "react-icons/gi";

import UserContext from "../context/UserContext";

const Navigation = () => {
  const { user, onLogout } = useContext(UserContext);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [user]);

  return (
    <Navbar className="nav-bar-style" variant="light" expand="lg" key={key}>
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            <GiHollowCat /> {""}The Purrington Post
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user.isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/new">
                  New Post
                </Nav.Link>
                <Nav.Link onClick={onLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/create-user">
                  Create User
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
