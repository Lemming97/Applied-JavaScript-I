import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Form, Button, Container } from "react-bootstrap";

const Login = (props) => {
  const { onLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <Container>
      <Form name="login" onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!email && !password}>
          Login
        </Button>
      </Form>
    </Container>
  );
};
export default Login;
