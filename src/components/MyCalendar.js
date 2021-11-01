import { useContext, useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AppContext } from "../AppContext";

import Task from "./Task";
import ExitBtn from "./ExitBtn";
import AddTask from "./AddTask";

const MyCalendar = () => {
  const { tasks, setDayTasksPanelActive, dayTasksPanelActive } =
    useContext(AppContext);

  const [dayTasks, setDayTasks] = useState([]);
  const [clickedDate, setClickedDate] = useState("");
  const [addTaskCalendarBtnActive, setAddTaskCalendarBtnActive] =
    useState(false);

  const handleDateClick = (info) => {
    const date = info.dateStr;
    setClickedDate(date);
    setDayTasks(tasks.filter((task) => task.date === date));
    setDayTasksPanelActive(true);
    setAddTaskCalendarBtnActive(false);
  };

  useEffect(() => {
    setDayTasks(tasks.filter((task) => task.date === clickedDate));
  }, [tasks, clickedDate]);

  const handleAddTaskCalendarBtn = () => {
    setAddTaskCalendarBtnActive(true);
  };

  const dayTasksElements = dayTasks.map((task) => (
    <Task key={task.id} {...task} />
  ));

  const dayTasksElement = dayTasksPanelActive ? (
    <ul>
      <h3>{clickedDate}</h3>
      {dayTasks.length > 0 ? (
        <>
          {dayTasksElements}
          {addTaskCalendarBtnActive ? (
            <AddTask calendarActive={true} date={clickedDate} />
          ) : (
            <button onClick={handleAddTaskCalendarBtn}>Dodaj</button>
          )}
        </>
      ) : (
        <>
          <h2>Nie masz zadań w tym dniu</h2>
          <h3>Dodaj zadanie:</h3>
          {addTaskCalendarBtnActive ? (
            <AddTask calendarActive={true} date={clickedDate} />
          ) : (
            <button onClick={handleAddTaskCalendarBtn}>Dodaj</button>
          )}
        </>
      )}
    </ul>
  ) : null;

  const showOrHidePanel = dayTasksPanelActive ? "show" : "hide";

  return (
    <>
      <div className={`${showOrHidePanel}`}>
        <ExitBtn func={setDayTasksPanelActive} />
        {dayTasksElement}
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={tasks}
        dateClick={handleDateClick}
        headerToolbar={{
          start: "prev,next",
          center: "title",
          end: "today",
        }}
      />
    </>
  );
};

export default MyCalendar;
