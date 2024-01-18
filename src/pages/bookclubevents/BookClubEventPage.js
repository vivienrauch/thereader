import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import PopularProfiles from "../profiles/PopularProfiles";
import BookClubEvent from "./BookClubEvent";
import AddEventButton from "../../components/AddEventButton";

function BookClubEventPage() {
  const { id } = useParams();
  const [bookclubevent, setBookClubEvent] = useState({ results: [] });
  const currentUser = useCurrentUser();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data: bookclubevent } = await axiosReq.get(`/bookclubevents/${id}`);
        setBookClubEvent({ results: [bookclubevent] });
      } catch (err) {
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row>
      <Col>
        <PopularProfiles mobile />
        {currentUser && (
          <AddEventButton url="/bookclubevents/create" text="Create Event" mobile />
        )}
        <BookClubEvent {...bookclubevent.results[0]} setBookClubEvents={setBookClubEvent} BookClubEventPage />
      </Col>
      <Col>
        {currentUser && (
          <AddEventButton url="/bookclubevents/create" text="Add Event" />
        )}
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default BookClubEventPage;