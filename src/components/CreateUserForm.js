import React, { useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateUserForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("New user created:", user);

      toast.success("Account Created! Please Log In!", {
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message",
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Container>
      <Form name="create-account" onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={!email && !password}>
          Create Account
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default CreateUserForm;
