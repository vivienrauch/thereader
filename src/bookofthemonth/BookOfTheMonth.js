import React, { useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";


const BookOfTheMonth = (props) => {
  const {
    id,
    title,
    content,
    image,
    created_at,
    website,
  } = props;

  const [book, setBook] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axiosReq.get("/bookofthemonth");
        setBook(response.data);
      } catch (err) {
        // console.log(err);
      }
    };

    if (!title) {
      fetchBook();
    }
  }, [id, title]);

  if (!title || !book) {
    return <div>Seems like there is no new book yet... Check back in later!</div>;
  }

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