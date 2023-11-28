import React, { useEffect, useState } from "react";
import appStyles from "../App.module.css";
import styles from "../styles/BookOfTheMonth.module.css";
import axios from "axios";


const BookOfTheMonth = (props) => {
    const {
        id,
        title,
        content,
        image,
        created_at,
        website,
    } = props;

    const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get("/bookofthemonth/1/");
        setBook(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (!title) {
      fetchBook();
    }
  }, [id, title]);

  if (!title || !book) {
    return <div>Loading Book of the Month...</div>;
  }

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.content}</p>
      <img src={book.image} alt="Book cover" />
      <p>Read more and buy: {book.website}</p>
      <p>{book.created_at}</p>
    </div>
  );
};

export default BookOfTheMonth;