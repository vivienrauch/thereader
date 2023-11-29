import React, { useState, useEffect } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import BookClubEvent from "./BookClubEvent";
import Asset from "../components/Asset";
import appStyles from "../App.module.css";
import styles from "../styles/BookClubEventsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../api/axiosDefaults";
import NoResults from "../assets/no-results.png";
import PopularProfiles from "../pages/profiles/PopularProfiles";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../utils/utils";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import AddEventButton from "../components/AddEventButton";

function BookClubEventsPage({ message }) {
  const [bookclubevents, setBookClubEvents] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");
  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchBookClubEvents = async () => {
      try {
        const { data } = await axiosReq.get(`/bookclubevents/?search=${query}`);
        setBookClubEvents(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchBookClubEvents();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query, pathname, currentUser]);

  return (
    <Row>
      <Col>
        <PopularProfiles mobile />
        {currentUser && (
          <AddEventButton url="/bookclubevents/create" text="Create Event" mobile />
        )}
        <i className={`fas fa-search ${styles.SearchIcon}`} />
        <Form
          className={styles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search Book Club Events"
          />
        </Form>
        {hasLoaded ? (
          <>
            {bookclubevents.results.length ? (
              <InfiniteScroll
                children={bookclubevents.results.map((bookclubevent) => (
                  <BookClubEvent key={bookclubevent.id} {...BookClubEvent} setBookClubEvents={setBookClubEvents} />
                ))}
                dataLength={bookclubevents.results.length}
                loader={<Asset spinner />}
                hasMore={!!bookclubevents.next}
                next={() => fetchMoreData(bookclubevents, setBookClubEvents)}
              />
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col>
        {currentUser && (
          <AddEventButton url="/bookclubevents/create" text="Create Event" />
        )}
        <PopularProfiles />
      </Col>
    </Row>
  );
}

export default BookClubEventsPage;