import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Aarhus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Parking Zone" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">BRUUNS</NavDropdown.Item>
              <NavDropdown.Item href="/garage">
                INCUBA
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                KALKVAERKSVEJ
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                NewBusgadehuset
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">SALLING</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">NORREPORT</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                Urban Level
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">MAGASIN</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                SCANDCENTER
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                New Bruuns Galleri
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">
                Urban Level 2+3
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.1">Navitas</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
