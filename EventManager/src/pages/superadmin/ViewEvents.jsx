import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import environment from "../../utils/environment";
import { Card, Button, Row, Col } from "react-bootstrap";
import "./ViewEvents.css";

const viewEvents = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${environment.backUrl}/api/Client/get-all-events`);
                if(!response.ok){
                    throw new Error(`Failed to fetch events`);
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error(`Error fetching data: ${error.message}`);
            }
        };
        fetchEvents();
    }, []);

    const handleEdit = (eventId) => {
        navigate(`/edit-event/${eventId}`);
    };

    const handleDelete = async (eventId) => {
        const confirmDeletion = window.confirm("Are you sure you want to delete this event?");
        if(confirmDeletion && localStorage.getItem("authToken")){
            try {
                const response = await fetch(`${environment.backUrl}/api/Events/${eventId}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
                    }
                });
                if(!response.ok){
                    throw new Error(`Failed to delete event`);
                }
                setEvents((prevEvents) => prevEvents.filter(event => event.id !== eventId))
            } catch(e){
                console.error("Error deleting event: ", e);
                alert("Error deleting event");
            }
        }
    };

    // console.log(events); 
    return (
        <div className="events-container">
        <h2>All Events</h2>
        {events.length > 0 ? (
            <Row xs={1} md={3} className="g-4">
                {events.map(event => (
                    <Col key={event.id}>
                        <Card className="event-card">
                            <Card.Body>
                                <Card.Title>{event.name}</Card.Title>
                                <Card.Text>
                                    <p>Date: {event.date}</p>
                                    <p>City: {event.city}</p>
                                    <p>Address: {event.address}</p>
                                    <p>Number of tickets: {event.numberOfTickets}</p>
                                    <p>Category: {event.category}</p>
                                    <p>Price: {event.price}</p>
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleEdit(event.id)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(event.id)} style={{ marginLeft: '10px' }}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        ) : (
            <p>No available events</p>
        )}
    </div>
        // <div className="events-container">
        //     <h2>All events</h2>
        //     { events.length > 0 ? 
        //     (<ul className="events-container">
        //         {events.map(event => {
        //             return(
        //                 <div className="event-card" key={event.id}>
        //                 <h3>{event.name}</h3>
        //                 <p>Date: {event.date}</p>
        //                 <p>City: {event.city}</p>
        //                 <p>Address: {event.address}</p>
        //                 <p>Number of tickets: {event.numberOfTickets}</p>
        //                 <p>Category: {event.category}</p>
        //                 <p>Price: {event.price}</p>
        //                 <button onClick={() => handleEdit(event.id)}>Edit</button>
        //                 <button onClick={() => handleDelete(event.id)}>Delete</button>
        //             </div>);
        //         })}
        //     </ul>) : (<p>No available events</p>)}
        // </div>
    )
}

export default viewEvents;