import { useState, useEffect } from "react";
import environment from "../../utils/environment";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import "./EventForm.css";

const EventForm = () => {
  const [eventData, setEventData] = useState({
    Name: "",
    Address: "",
    City: "",
    Date: "",
    NumberOfTickets: 0,
    Category: "",
    Price: 0.0,
    EventOrganizerId: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${environment.backUrl}/create-event`;
      const method = "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
    } catch (e) {
      console.error("Error submitting event");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center create-container" style={{ minHeight: '100vh' }}>
      <Card className="p-4" style={{ width: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Row className="mb-4">
          <h2>Crear Evento</h2>
        </Row>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="eventName">
            <Form.Label>Nombre del Evento</Form.Label>
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
              onChange={handleChange}
              placeholder="Ingrese la ciudad"
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
              required
            />
          </Form.Group>

          <Form.Group controlId="eventNumberOfTickets">
            <Form.Label>Número de Entradas</Form.Label>
            <Form.Control
              type="number"
              name="NumberOfTickets"
              value={eventData.NumberOfTickets}
              onChange={handleChange}
              placeholder="Ingrese el número de entradas"
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

          <Form.Group controlId="eventOrganizerId">
            <Form.Label>ID del Organizador del Evento</Form.Label>
            <Form.Control
              type="text"
              name="EventOrganizerId"
              value={eventData.EventOrganizerId}
              onChange={handleChange}
              placeholder="Ingrese el ID del organizador"
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Crear Evento
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default EventForm;
