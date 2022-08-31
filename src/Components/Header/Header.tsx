import { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useLocation } from "react-router-dom";

import { AppContext } from "../../Contexts/AppContext";

function Header() {
  const {
    state: { activeMediaType },
    dispatch,
  } = useContext(AppContext);
  const location = useLocation();
  const expand = "md";
  const linkStyle = "nav-link d-flex gap-2 ps-3 pe-3";

  return (
    <Navbar key={expand} bg="black" variant="dark" expand={expand} className="mb-3" sticky="top">
      <Navbar.Brand>
        <NavLink to="/" className={linkStyle}>
          <em>Watch/Not</em>
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Offcanvas placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="justify-content-end align-items-center flex-grow-1 pe-3">
            <ButtonGroup aria-label="Basic example">
              <Button
                variant={activeMediaType === "movie" ? "primary" : "light"}
                onClick={() => dispatch({ activeMediaType: "movie" })}
              >
                Movies
              </Button>
              <Button
                variant={activeMediaType === "tv" ? "primary" : "light"}
                onClick={() => dispatch({ activeMediaType: "tv" })}
              >
                TV Shows
              </Button>
            </ButtonGroup>
            <Nav.Link as={NavLink} to="/search" state={{ background: location }} bsPrefix={linkStyle}>
              <i className="bi bi-search"></i>
              Search
            </Nav.Link>
            <Nav.Link as={NavLink} to="/configure" state={{ background: location }} bsPrefix={linkStyle}>
              <i className="bi bi-gear-fill"></i>
              Configure Languages
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" bsPrefix={linkStyle}>
              About Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" bsPrefix={linkStyle}>
              Contact Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" bsPrefix={linkStyle}>
              <Button variant="success">Login</Button>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  );
}

export default Header;
