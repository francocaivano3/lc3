import { useParams } from "react-router-dom";
import EditEventForm from "./EditEventForm";

const EditEvent = () => {
    const {eventId} = useParams();

    return (
        <div>
            <EditEventForm eventId={eventId}/>
        </div>
    )
}

export default EditEvent;