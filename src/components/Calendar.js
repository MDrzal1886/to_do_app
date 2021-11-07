import { useContext, useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { AppContext } from "../AppContext";

import Task from "./Task";
import ExitBtn from "./ExitBtn";

const Calendar = () => {
  const {
    addPanelActive,
    setAddPanelActive,
    calendarPanelActive,
    setCalendarPanelActive,
    tasks,
    setDayTasksPanelActive,
    dayTasksPanelActive,
    clickedDate,
    setClickedDate,
    todayDate,
  } = useContext(AppContext);

  const [dayTasks, setDayTasks] = useState([]);

  const calendarRef = useRef(null);

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    if (!calendarPanelActive) {
      calendarApi.today();
    }
  }, [calendarPanelActive]);

  const handleDateClick = (info) => {
    const date = info.dateStr;
    setClickedDate(date);
    setDayTasks(tasks.filter((task) => task.date === date));
    setDayTasksPanelActive(true);
  };

  useEffect(() => {
    setDayTasks(tasks.filter((task) => task.date === clickedDate));
  }, [tasks, clickedDate]);

  const handleAddTaskCalendarBtn = () => {
    setAddPanelActive(true);
  };

  const dayTasksElements = dayTasks.map((task) => (
    <Task key={task.id} {...task} />
  ));

  const dayTasksElement = dayTasksPanelActive ? (
    <>
      <h1>{clickedDate}</h1>
      {addPanelActive ? null : clickedDate >= todayDate ? (
        <button
          onClick={handleAddTaskCalendarBtn}
          className="navButton light-color dayPanelAddButton"
        >
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      ) : null}
      <ul className="tasksListContainer">
        {dayTasks.length > 0 ? (
          dayTasksElements
        ) : clickedDate < todayDate ? (
          <h1>
            Nie można dodać zadania, lepiej nie planować zadań na przeszłość!
          </h1>
        ) : (
          <h1>Nie masz zadań w tym dniu</h1>
        )}
      </ul>
    </>
  ) : null;

  const showOrHideDayTaskPanel = dayTasksPanelActive ? "show" : "hide";

  const showOrHidePanel = () => {
    if (calendarPanelActive === false) {
      return "hide";
    } else if (calendarPanelActive === true) {
      return "show";
    } else {
      return "";
    }
  };

  return (
    <div className={`${showOrHidePanel()} panelContainer`}>
      <ExitBtn func={setCalendarPanelActive} />
      <div className={`${showOrHideDayTaskPanel} panelContainer`}>
        <ExitBtn func={setDayTasksPanelActive} />
        {dayTasksElement}
      </div>
      <div className="calendarContainer">
        <FullCalendar
          ref={calendarRef}
          dayMaxEventRows={false}
          views={{
            dayGridMonth: {
              dayMaxEvents: 1,
            },
          }}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={tasks}
          dateClick={handleDateClick}
          fixedWeekCount={false}
          weekNumberCalculation="ISO"
          eventBackgroundColor="#d3cce3"
          eventBorderColor="transparent"
          contentHeight="auto"
          eventTextColor="black"
          headerToolbar={{
            start: "prev,next",
            center: "title",
            end: "today",
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
