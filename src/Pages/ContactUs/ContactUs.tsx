import { useState } from "react";
import { Button, Col, Figure, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import styles from "./ContactUs.module.scss";

function ContactUs() {
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
      <Row>
        <Figure className={styles.figure}>
          <Figure.Image className="w-50" src="/contact-us.png" loading="lazy" />
        </Figure>
      </Row>
      <Row className="d-flex pt-5 pb-5 align-items-center justify-content-center">
        <Col md={5}>
          <h2> Contact Us </h2>
          <p>Our friendly team will love to hear from you!</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>First name</Form.Label>
                <Form.Control required type="text" placeholder="First name" />
                <Form.Control.Feedback type="invalid">Please provide a first name.</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="6">
                <Form.Label>Last name</Form.Label>
                <Form.Control required type="text" placeholder="Last name" />
                <Form.Control.Feedback type="invalid">Please provide a last name.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" required />
                <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={6} placeholder="Message" required />
              <Form.Control.Feedback type="invalid">Please enter a message.</Form.Control.Feedback>
            </Form.Group>
            <Button type="submit">Send Message</Button>
          </Form>
        </Col>
        <Col></Col>
        <Col md={6}>
          <h2> Address </h2>
          <div className={styles.fluidMedia}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3566.66117321926!2d77.68243936300833!3d12.924397859662562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13a72938a7cf%3A0xb377ea79d91898!2sGlobal%20Technology%20Park!5e0!3m2!1sen!2sin!4v1661393676721!5m2!1sen!2sin"
              width="800"
              height="700"
              style={{ border: "1px solid transparent", borderRadius: "0.5rem" }}
              allowFullScreen={true}
              loading="lazy"
              title="Location"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ContactUs;
