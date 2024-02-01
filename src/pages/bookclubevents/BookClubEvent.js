import React, { useState } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { 
    Card,
    Row,
    Col,
    Media,
    Tooltip,
    OverlayTrigger,
    ListGroup,
    ListGroupItem,
    Modal,
} from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { Link, useHistory } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";
import { Button } from "react-bootstrap";
import styles from "../../styles/Button.module.css";


const BookClubEvent = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        event_cover,
        event_name,
        event_description,
        event_start,
        event_end,
        event_location,
        event_organiser,
        contact,
        website,
        response_id,
        response_count,
        setBookClubEvents,
        bookclubeventPage,
        updated_at,
        date,
    } = props;

const currentUser = useCurrentUser();
const is_owner = currentUser?.username === owner;
const history = useHistory();
const [showConfirmation, setShowConfirmation] = useState(false);

const handleShowConfirmation = () => setShowConfirmation(true);
const handleCloseConfirmation = () => setShowConfirmation(false);

const handleEdit = async () => {
    history.push(`/bookclubevents/${id}/edit`);
};

const handleDelete = async () => {
    try {
      await axiosRes.delete(`/bookclubevents/${id}`);
      handleCloseConfirmation();
      history.push('/bookclubevents');
    } catch (err) {
       // console.log(err);
    }
}

const handleResponse = async () => {
    try {
        const { data } = await axiosRes.post("/responses/", { bookclubevent: id });
        setBookClubEvents((prevBookClubEvents) => ({
            ...prevBookClubEvents,
            results: prevBookClubEvents.results.map((bookclubevent) => {
                return bookclubevent.id === id
                ? {
                    ...bookclubevent,
                    response_count: bookclubevent.response_count + 1,
                    response_id: data.id,
                  }
                : bookclubevent;
            }),
        }));
    } catch (err) {
        // console.log(err);
    }
};

const handleRemoveResponse = async () => {
    try {
        await axiosRes.delete(`/responses/${response_id}/`);
        setBookClubEvents((prevBookClubEvents) => ({
            ...prevBookClubEvents,
            results: prevBookClubEvents.results.map((bookclubevent) => {
                return bookclubevent.id === id
                ? {
                    ...bookclubevent,
                    response_count: bookclubevent.response_count - 1,
                    response_id: null,
                  }
                : bookclubevent;
            }),
        }));
    } catch (err) {
        // console.log(err);
    }
};

    return (
        <Card>
            <Card.Body>
                <Media>
                    <div>
                        <Link to={`/profiles/${profile_id}/`}>
                            <Avatar src={profile_image} height={55} />
                        </Link>
                        <span>{owner}</span>
                    </div>
                    <div>
                        <span>{updated_at}</span>
                        {is_owner && bookclubeventPage && (
                            <>
                                <MoreDropdown
                                    handleEdit={handleEdit}
                                    handleDelete={handleShowConfirmation}
                                />
                                <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure you want to delete your event?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className={styles.Button} onClick={handleCloseConfirmation}>
                                            Cancel
                                        </Button>
                                        <Button className={styles.Button} onClick={handleDelete}>
                                            Delete
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </>
                        )}
                    </div>
                </Media>
            </Card.Body>
            <Card.Img src={event_cover} alt={event_name} />
            <Card.Body>
                <Link to={`/bookclubevents/${id}`}>
                    <Card.Title>{event_name}</Card.Title>
                </Link>
                {event_description && <Card.Text>{event_description}</Card.Text>}
                <Row>
                    <Col>
                        <Card.Header>
                            Description
                        </Card.Header>
                        <ListGroup>

                            {date && (
                                <ListGroupItem>
                                    <i aria-hidden="true" className="fa-solid fa-calendar-days"></i>{" "}
                                    {date}
                                </ListGroupItem>
                            )}

                            {event_start && (
                                <ListGroupItem>
                                    <i aria-hidden="true" className="fa-regular fa-clock"></i>{" "}
                                    We start at: {event_start}
                                </ListGroupItem>
                            )}

                            {event_end && (
                                <ListGroupItem>
                                    <i aria-hidden="true" className="fa-solid fa-hourglass-end"></i>{" "}
                                    We finish at: {event_end}
                                </ListGroupItem>
                            )}

                            {event_location && (
                                <ListGroupItem>
                                    <i aria-hidden="true" className="fa-solid fa-location-dot"></i>{" "}
                                    We meet at: {event_location}
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Col>
                    <Col>
                        <Card.Header>Contact Details</Card.Header>
                        <ListGroup>
                            {event_organiser && (
                                <ListGroupItem>
                                    Organiser: {event_organiser}
                                </ListGroupItem>
                            )}

                            {contact && (
                                <ListGroupItem>
                                    <i aria-hidden="true" className="fa-solid fa-at"></i>{" "}
                                    Get in touch - {contact}
                                </ListGroupItem>
                            )}

                            {website && (
                                <ListGroupItem>
                                    <i aria-hidden="true" className="fa-solid fa-globe"></i>{" "}
                                    <a href={website} aria-label="book website" target="_blank" rel="noreferrer">Website</a>
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
                <div>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't be an attendee to your organized Book Club Event.</Tooltip>}>
                            <span>Attend someone's event! </span>
                        </OverlayTrigger>
                    ) : response_id ? (
                        <span onClick={handleRemoveResponse}>
                            <i className="fa-solid fa-calendar-xmark"></i>
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleResponse}>
                            <i className="fa-solid fa-calendar-check"></i>
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You need to be logged in to attend our Book Club Events!</Tooltip>}>
                            <span>Log in </span>
                        </OverlayTrigger>
                    )}
                    {response_count}               
                </div>
            </Card.Body>
        </Card>
    );
};

export default BookClubEvent;