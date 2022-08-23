import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useLocation } from "react-router-dom";

type Props = {};

function Header({}: Props) {
  const location = useLocation();
  const expand = "md";
  const linkStyle = "nav-link d-flex gap-2 ps-3 pe-3";

  return (
    <Navbar key={expand} bg="black" variant="dark" expand={expand} className="mb-3" sticky="top">
      <Container fluid>
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
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={NavLink} to="/search" state={{ background: location }} bsPrefix={linkStyle}>
                <i className="bi bi-search"></i>
                Search
              </Nav.Link>
              <Nav.Link as={NavLink} to="/configure" state={{ background: location }} bsPrefix={linkStyle}>
                <i className="bi bi-gear-fill"></i>
                Configure
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" bsPrefix={linkStyle}>
                About Us
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact" bsPrefix={linkStyle}>
                Contact Us
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Header;
