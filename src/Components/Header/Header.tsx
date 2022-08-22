import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

type Props = {};

function Header({}: Props) {
  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#home">Watch / Not</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 ps-6 pe-3">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">About Us</NavDropdown.Item>
              <NavDropdown.Item href="#">Contact Us</NavDropdown.Item>
              <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
