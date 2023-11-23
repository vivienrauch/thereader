import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/thereaderlogo.png';

const NavBar = () => {
  return (
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="logo" height="250"></img>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>Sign in</Nav.Link>
            <Nav.Link>Sign up</Nav.Link>
            <Nav.Link>Book Club Events</Nav.Link>
            <Nav.Link>Book of the Month</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar