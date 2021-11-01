import { useContext } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AppContext } from "../AppContext";

const MyCalendar = () => {
  const { events } = useContext(AppContext);

  const handleDateClick = () => alert("jdsjd");

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
      headerToolbar={{
        start: "prev,next",
        center: "title",
        end: "today",
      }}
    />
  );
};

export default MyCalendar;
