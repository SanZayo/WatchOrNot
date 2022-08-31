import { useState } from "react";
import { Button, Form, Stack, Col, Row, Figure, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Login.module.scss";

function Login() {
  const [login, setLogin] = useState({ email: "demo@yopmail.com", password: "test123" });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLogin((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Navbar bg="black" variant="dark" className="mb-3" sticky="top">
        <Navbar.Brand>
          <NavLink to="/" className="nav-link d-flex gap-2 ps-3 pe-3">
            <em>Watch/Not</em>
          </NavLink>
        </Navbar.Brand>
      </Navbar>
      <Stack className="d-flex justify-content-center align-items-center mx-auto w-25 mt-5 pt-5">
        <Row>
          <Figure className={styles.figure}>
            <Figure.Image className="w-100" src="/login.gif" />
          </Figure>
        </Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column w-100 mt-5">
          <h2> Login </h2>
          <Form.Group className="mt-3 mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              value={login.email}
              onChange={handleChange}
              defaultValue="demo"
            />
            <Form.Control.Feedback type="invalid">Please provide a email.</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              value={login.password}
              onChange={handleChange}
              defaultValue="test123"
            />
            <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
          </Form.Group>
          <span></span>
          <Col>
            Not a member? <NavLink to="/Register">Register now</NavLink>
            <br />
            <Button type="submit" className="mt-3">
              Login
            </Button>
          </Col>
        </Form>
      </Stack>
    </>
  );
}

export default Login;
