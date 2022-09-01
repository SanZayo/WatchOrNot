import { useState } from "react";
import { Button, Form, Col, Row, Figure, Navbar, Alert, InputGroup } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

import styles from "./Register.module.scss";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState<Record<string, string>>({
    name: "",
    email: "",
    gender: "male",
    dob: "",
    country: "IN",
    countryCode: "91",
    mobile: "",
    choose_password: "",
    confirm_password: "",
  });

  const [alert, showAlert] = useState({
    show: false,
    variant: "",
    message: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
    e.stopPropagation();
  };

  const handleCountryChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setUser((state) => ({
      ...state,
      country: e.target.value as string,
      countryCode: e.target.selectedOptions[0].dataset.country_code as string,
    }));
    e.stopPropagation();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      if (user.choose_password !== user.confirm_password) {
        showAlert({
          show: true,
          variant: "danger",
          message: "The passwords you entered doesn't match!",
        });
      }
    } else {
      navigate("/");
      showAlert({
        show: true,
        variant: "success",
        message: "User registered successfully!",
      });
    }
  };

  return (
    <>
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => showAlert((state) => ({ ...state, show: false }))} dismissible>
          {alert.message}
        </Alert>
      )}
      <Navbar bg="black" variant="dark" className="mb-3" sticky="top">
        <Navbar.Brand>
          <NavLink to="/" className="nav-link d-flex gap-2 ps-3 pe-3">
            <em>Watch/Not</em>
          </NavLink>
        </Navbar.Brand>
      </Navbar>
      <Row>
        <Col className="d-flex flex-column mx-auto w-75">
          <Figure className={styles.figure + " mx-auto w-75"}>
            <Figure.Image className="w-100" src="/register.gif" loading="lazy" />
          </Figure>
          <Figure className={styles.figure + " mx-auto w-75"}>
            <Figure.Image className="w-100" src="/oneOfUs.gif" loading="lazy" />
          </Figure>
        </Col>
        <Col>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column mx-auto w-50">
            <h2> Register </h2>
            <Form.Group className="mt-3 mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                type="name"
                placeholder="Full Name"
                name="name"
                value={user.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please provide your full name.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
            </Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Group className="d-flex gap-5 mb-3">
              <Form.Check type="radio" name="gender" onChange={handleChange} value="male" defaultChecked label="Male" />
              <Form.Check type="radio" name="gender" onChange={handleChange} value="female" label="Female" />
              <Form.Check type="radio" name="gender" onChange={handleChange} value="other" label="Others" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                required
                type="date"
                placeholder="DOB"
                name="dob"
                value={user.dob}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please provide a Date of Birth</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Select name="country" onChange={handleCountryChange}>
                <option data-country_code="91" value="IN">
                  India
                </option>
                <option data-country_code="39" value="IT">
                  Italy
                </option>
                <option data-country_code="60" value="MY">
                  Malaysia
                </option>
                <option data-country_code="44" value="GB">
                  UK
                </option>
                <option data-country_code="1" value="US">
                  USA
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text>{`+${user.countryCode}`}</InputGroup.Text>
                <Form.Control
                  required
                  type="number"
                  placeholder="Mobile Number"
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">Please provide a valid number</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <hr />
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                type="confirm_password"
                placeholder="Confirm Password"
                name="confirm_password"
                value={user.confirm_password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">Please enter your password again.</Form.Control.Feedback>
            </Form.Group>
            <Col>
              Already a member? <NavLink to="/Register">Login now</NavLink>
              <br />
              <Button type="submit" className="mt-3">
                Register
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Register;
