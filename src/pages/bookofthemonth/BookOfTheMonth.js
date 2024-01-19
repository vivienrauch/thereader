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
        const response = await axiosReq.get("/bookofthemonth");
        setBook(response.data);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchBook();

  }, [id, title, pathname, currentUser]);
  
  return (
    <div>
      {created_at}
      <h2>{title}</h2>
      <p>{content}</p>
      <img src={image} alt="Book cover" />
      <p>Read more and buy: {website}</p>
    </div>
  );
};

export default BookOfTheMonth;