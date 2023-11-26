import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/thereaderlogo.png';
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../contexts/CurrentUserContext';
import Avatar from "./Avatar";
import axios from 'axios';
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";


const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const {expanded, setExpanded, ref} = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const addPostIcon = (
    <NavLink
      to="/posts/create"
      className={styles.Navlink}
      activeClassName={styles.Active}>
        <i class="fa-solid fa-pen-nib"></i>Add post
    </NavLink>
  )

  const loggedInIcons = (
    <>
      <NavLink
        to="/feed"
        className={styles.Navlink}
        activeClassName={styles.Active}>
        <i class="fa-solid fa-glasses"></i>Feed
      </NavLink>
      <NavLink
        to="/liked"
        className={styles.Navlink}
        activeClassName={styles.Active}>
        <i class="fa-regular fa-heart"></i>Liked
      </NavLink>
      <NavLink to="/bookofthemonth"
        className={styles.Navlink}
        activeClassName={styles.Active}>
        <i class="fa-solid fa-star"></i>Book of the Month
      </NavLink>
      <NavLink
        to="/bookclubevents"
        className={styles.Navlink}
        activeClassName={styles.Active}>
        <i class="fa-solid fa-calendar-days"></i>Book Club
      </NavLink>
      <NavLink
        to="/"
        onClick={handleSignOut}
        className={styles.Navlink}>
        <i class="fa-solid fa-door-open"></i>Sign Out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.Navlink}
      >
        <Avatar src={currentUser?.profile_image} text="Profile" height={33} />
      </NavLink>
    </>);
  const loggedOutIcons = (
    <>
      <NavLink to="/signin"
        className={styles.Navlink}
        activeClassName={styles.Active}>
        <i class="fa-solid fa-person-walking-arrow-right"></i>Sign in
      </NavLink>
      <NavLink to="/signup"
        className={styles.Navlink}
        activeClassName={styles.Active}>
        <i class="fa-solid fa-user-plus"></i>Sign up
      </NavLink>
    </>
  )

  return (
    <Navbar expanded={expanded} className={styles.NavBar} expand="md" fixed="top">
        <Container>
          <NavLink to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" height="150"></img>
            </Navbar.Brand>
          </NavLink>
          {currentUser && addPostIcon}
          <Navbar.Toggle
            onClick={() => setExpanded(!expanded)}
            aria-controls="basic-navbar-nav"
            className={styles.NavBarTogglerIcon}
            ref={ref}
          />
          <Navbar.Collapse id="basic-navbar-nav" className={styles.NavBarTogglerIcon}>
            <Nav className="mr-auto text-right">
              <NavLink exact to="/"
                className={styles.Navlink}
                activeClassName={styles.Active}>
                  <i class="fa-solid fa-couch"></i>Home
              </NavLink>
              
              {currentUser ? loggedInIcons : loggedOutIcons}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};

export default NavBar;