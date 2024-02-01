import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router";
import styles from "../../styles/BookOfTheMonth.module.css";


const BookOfTheMonth = () => {

  const [books, setBook] = useState();
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosReq.get("/bookofthemonth/");
        console.log(response);
        setBook(response.data.results);
      } catch (err) {
       // console.log(err);
      }
    };

    fetchBooks();

  }, [pathname, currentUser]);
  
  return (
    <div className={styles.Container}>
      {books && books.map((book) => (
        <div key={book.id} className={styles.Card}>
          <p>{book.created_at}</p>
          <h2>{book.title}</h2>
          <p>{book.content}</p>
          <a href={book.website} target="_blank" rel="noopener noreferrer">
            <img className={styles.CoverImage} src={book.image} alt="Book cover" />
          </a>
        </div>
      ))}
    </div>
  );
};

export default BookOfTheMonth;