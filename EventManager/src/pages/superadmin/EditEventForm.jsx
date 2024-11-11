import { useState, useEffect } from "react";
import environment from "../../utils/environment";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import "./EditEventForm.css";
import { useNavigate } from "react-router-dom";

const EditEventForm = ({ eventId }) => {
  const [eventData, setEventData] = useState({
    Id: Number(eventId),
    Name: "",
    Address: "",
    City: "",
    Date: "",
    Category: "",
    Price: 0,
  });

    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${environment.backUrl}/update-event`;
      const method = "PUT";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) {
        alert("An error occurred");
        throw new Error("Failed to update event");
      }

      alert("Event successfully updated");
      navigate("/view-events");
    } catch (e) {
      console.error("Error submitting event");
    }
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center edit-container" style={{ minHeight: '100vh' }}>
      <Card className="p-4" style={{ width: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Row className="mb-4">
          <h2>Editar Evento</h2>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="eventId">
            <Form.Label>ID del Evento</Form.Label>
            <Form.Control
              type="number"
              name="Id"
              value={eventData.Id}
              onChange={handleChange}
              disabled
            />
          </Form.Group>

          <Form.Group controlId="eventName">
            <Form.Label>Nombre</Form.Label> 
            <Form.Control
              type="text"
              name="Name"
              value={eventData.Name}
              onChange={handleChange}
              placeholder="Ingrese el nombre del evento"
              required
            />
          </Form.Group>

          <Form.Group controlId="eventAddress">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="Address"
              value={eventData.Address}
              onChange={handleChange}
              placeholder="Ingrese la dirección del evento"
              required
            />
          </Form.Group>

          <Form.Group controlId="eventCity">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="City"
              value={eventData.City}
              placeholder="Ingrese la ciudad del evento"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="eventDate">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="text"
              name="Date"
              value={eventData.Date}
              onChange={handleChange}
              placeholder="Ingrese la fecha del evento"
              required
            />
          </Form.Group>

          <Form.Group controlId="eventCategory">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              name="Category"
              value={eventData.Category}
              onChange={handleChange}
              placeholder="Ingrese la categoría del evento"
              required
            />
          </Form.Group>

          <Form.Group controlId="eventPrice">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="Price"
              value={eventData.Price}
              onChange={handleChange}
              placeholder="Ingrese el precio del evento"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Editar Evento
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default EditEventForm;
