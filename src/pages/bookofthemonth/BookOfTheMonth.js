import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useLocation } from "react-router";


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
  const { pathname } = useLocation();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosReq.get("/bookofthemonth/");
        setBook(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBook();

  }, [id, title, pathname, currentUser]);
  
  return (
    <div>
      {book && <p>{book.created_at}</p>}
      {book && <h2>{book.title}</h2>}
      {book && <p>{book.content}</p>}
      {book && <img src={book.image} alt="Book cover" />}
      {book && <p>Read more and buy: {book.website}</p>}
    </div>
  );
};

export default BookOfTheMonth;