import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import btnStyles from "../styles/Button.module.css";

const AddEventButton = ({ url, text, mobile }) => {
  return (
    <Container className={`${btnStyles.Container} ${mobile ? 'd-lg-none text-center' : 'd-none d-lg-block'} mb-2 m-0 p-0`}>
      <Button
        className={`d-flex justify-content-center ${btnStyles.EventButton}`}
        as={Link}
        to={url}
      >
        {text}
      </Button>
    </Container>
  );
};

export default AddEventButton;