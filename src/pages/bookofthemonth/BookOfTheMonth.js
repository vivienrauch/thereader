import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router";


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
    <div>
      {books && books.map((book) => (
        <div key={book.id}>
          <p>{book.created_at}</p>
          <h2>{book.title}</h2>
          <p>{book.content}</p>
          <img src={book.image} alt="Book cover" />
          <p>Read more and buy: {book.website}</p>
        </div>
      ))}
    </div>
  );
};

export default BookOfTheMonth;