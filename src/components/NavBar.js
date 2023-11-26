import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/thereaderlogo.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from '../contexts/CurrentUserContext';

const NavBar = () => {
  const currentUser = useCurrentUser();
  const loggedInIcons = <>{currentUser?.username}</>;
  const loggedOutIcons = (
    <>
      <NavLink to="/signin"
        className={styles.Navlink}
        activeClassName={styles.Active}>Sign in</NavLink>
      <NavLink to="/signup"
        className={styles.Navlink}
        activeClassName={styles.Active}>Sign up</NavLink>
      <NavLink
        to="/bookclubevents"
        className={styles.Navlink}
        activeClassName={styles.Active}>Book Club Events</NavLink>
      <NavLink to="/bookofthemonth"
        className={styles.Navlink}
        activeClassName={styles.Active}>Book of the Month</NavLink>
    </>
  )

  return (
    <Navbar className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="150"></img>
            </Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className={styles.NavBarTogglerIcon} />
          <Navbar.Collapse id="basic-navbar-nav" className={styles.NavBarTogglerIcon}>
            <Nav className="mr-auto text-right">
              <NavLink exact to="/"
                className={styles.Navlink}
                activeClassName={styles.Active}>Home</NavLink>
              
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavBar;