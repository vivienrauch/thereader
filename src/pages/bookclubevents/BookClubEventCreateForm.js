import React, { useRef, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Image,
  Alert,
} from "react-bootstrap";
import Upload from "../../assets/upload.png";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function BookClubEventCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});

  const [bookclubeventData, setBookClubEventData] = useState({
    event_name: "",
    event_description: "",
    event_cover: "",
    event_location: "",
    date: "",
    event_start: "",
    event_end: "",
    event_organiser: "",
    contact: "",
    website: "",
  });
  const {
    event_name,
    event_description,
    event_cover,
    event_location,
    date,
    event_start,
    event_end,
    event_organiser,
    contact,
    website,
  } = bookclubeventData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChange = (event) => {
    setBookClubEventData({
      ...bookclubeventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(event_cover);
      setBookClubEventData({
        ...bookclubeventData,
        event_cover: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();
    const selectedStartDateTime = new Date(`${date}T${event_start}`);
    const selectedEndDateTime = new Date(`${date}T${event_end}`);
    if (selectedStartDateTime < currentDate || selectedEndDateTime < currentDate) {
      setErrors({ date: ["Please select a future date and time."] });
      return;
    }

    if (selectedEndDateTime <= selectedStartDateTime) {
      setErrors({event_end: ["The event must end after it stars."]});
      return;
    }

    const formData = new FormData();

    formData.append("event_name", event_name);
    formData.append("event_description", event_description);
    formData.append("event_cover", imageInput.current.files[0]);
    formData.append("event_location", event_location);
    formData.append("date", date);
    formData.append("event_start", event_start);
    formData.append("event_end", event_end);
    formData.append("event_organiser", event_organiser);
    formData.append("contact", contact);
    formData.append("website", website);

    try {
      const { data } = await axiosReq.post("/bookclubevents/", formData);
      history.push(`/bookclubevents/${data.id}`);
    } catch (err) {
      // console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Row>
        <Col>
          <h3>Details</h3>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="event_name"
              value={event_name}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.event_name?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              name="event_description"
              value={event_description}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.event_description?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control
              required
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.date?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>Start at:</Form.Label>
            <Form.Control
              required
              type="time"
              name="event_start"
              value={event_start}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.event_start?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>End Time</Form.Label>
            <Form.Control
              required
              type="time"
              name="event_end"
              value={event_end}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.event_end?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>Where?</Form.Label>
            <Form.Control
              type="text"
              name="event_location"
              value={event_location}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.event_location?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
        <Col>
          <h3>Organiser</h3>
          <Form.Group>
            <Form.Label>Organiser</Form.Label>
            <Form.Control
              type="text"
              name="event_organiser"
              value={event_organiser}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.event_organiser?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="contact"
              name="contact"
              value={contact}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.contact?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Form.Group>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="url"
              name="website"
              value={website}
              onChange={handleChange}
            />
          </Form.Group>
          {errors?.website?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Col>
      </Row>
      <Button
        className={`${btnStyles.PostButton}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.PostButton}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Container
            className={`${appStyles.Content} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {event_cover ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={event_cover} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
              <Form.Text className="mb-4">
                The image field is required.
              </Form.Text>
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col lg={7} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default BookClubEventCreateForm;