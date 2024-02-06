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
import appStyles from "../../styles/BookClubEvent.module.css";


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
        <Card className={appStyles.BCEvent}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <div>
                        <Link to={`/profiles/${profile_id}/`}>
                            <Avatar src={profile_image} height={55} />
                        </Link>
                        <span>{owner}</span>
                    </div>
                    <div className="d-flex align-items-center">
                        <span>{updated_at}</span>
                        {is_owner && bookclubeventPage && (
                            <>
                                <MoreDropdown
                                    handleEdit={handleEdit}
                                    handleDelete={handleShowConfirmation}
                                />
                                <Modal className={`${appStyles.Modal}`} show={showConfirmation} onHide={handleCloseConfirmation}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Confirmation</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure you want to delete your event?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className={`${appStyles.Button} btn`} onClick={handleCloseConfirmation}>
                                            Cancel
                                        </Button>
                                        <Button className={`${appStyles.Button} btn`} onClick={handleDelete}>
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
                    <Card.Title className={`${appStyles.Heading} text-center`}>{event_name}</Card.Title>
                </Link>
                {event_description && <Card.Text>{event_description}</Card.Text>}
                <Row xs={1} md={2} className="g-4">
                    <Col>
                        <Card.Header className={appStyles.BCListHeader}>
                            Description
                        </Card.Header>
                        <ListGroup className="justify-content-md-center">

                            {date && (
                                <ListGroupItem className="d-flex align-items-center justify-content-between">
                                    <i aria-hidden="true" className={`${appStyles.BCEventIcons} fa-solid fa-calendar-days`}></i>{" "}
                                    {date}
                                </ListGroupItem>
                            )}

                            {event_start && (
                                <ListGroupItem className="d-flex align-items-center justify-content-between">
                                    <i aria-hidden="true" className={`${appStyles.BCEventIcons} fa-regular fa-clock`}></i>{" "}
                                    We start at: {event_start}
                                </ListGroupItem>
                            )}

                            {event_end && (
                                <ListGroupItem className="d-flex align-items-center justify-content-between">
                                    <i aria-hidden="true" className={`${appStyles.BCEventIcons} fa-solid fa-hourglass-end`}></i>{" "}
                                    We finish at: {event_end}
                                </ListGroupItem>
                            )}

                            {event_location && (
                                <ListGroupItem className="d-flex align-items-center justify-content-between">
                                    <i aria-hidden="true" className={`${appStyles.BCEventIcons} fa-solid fa-location-dot`}></i>{" "}
                                    We meet at: {event_location}
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Col>
                    <Col>
                        <Card.Header className={appStyles.BCListHeader}>Contact Details</Card.Header>
                        <ListGroup className="justify-content-md-center">
                            {event_organiser && (
                                <ListGroupItem className="d-flex align-items-center justify-content-between">
                                    Organiser: {event_organiser}
                                </ListGroupItem>
                            )}

                            {contact && (
                                <ListGroupItem className="d-flex align-items-center justify-content-between">
                                    <i aria-hidden="true" className={`${appStyles.BCEventIcons} fa-solid fa-at`}></i>{" "}
                                    Get in touch - {contact}
                                </ListGroupItem>
                            )}

                            {website && (
                                <ListGroupItem className="d-flex align-items-center justify-content-between">
                                    <i aria-hidden="true" className={`${appStyles.BCEventIcons} fa-solid fa-globe`}></i>{" "}
                                    <a href={website} aria-label="book website" target="_blank" rel="noreferrer">{website}</a>
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Col>
                </Row>
                <div>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can not be an attendee to your organized Book Club Event.</Tooltip>}>
                            <i className={`${appStyles.OwnEvent} fa-solid fa-calendar-check`}></i>
                        </OverlayTrigger>
                    ) : response_id ? (
                        <span onClick={handleRemoveResponse}>
                            <i className={`${appStyles.RemovedResp} fa-solid fa-calendar-xmark`}></i>
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleResponse}>
                            <i className={`${appStyles.Responded} fa-solid fa-calendar-check`}></i>
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You need to be logged in to attend our Book Club Events!</Tooltip>}>
                            <i className={`${appStyles.OwnEvent} fa-solid fa-calendar-check`}></i>
                        </OverlayTrigger>
                    )}
                    {response_count}               
                </div>
            </Card.Body>
        </Card>
    );
};

export default BookClubEvent;