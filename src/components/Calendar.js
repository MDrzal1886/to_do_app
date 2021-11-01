import { useContext } from "react";

import { AppContext } from "../AppContext";

import MyCalendar from "./MyCalendar";
import ExitBtn from "./ExitBtn";

const Calendar = () => {
  const { calendarPanelActive, setCalendarPanelActive } =
    useContext(AppContext);

  const showOrHidePanel = calendarPanelActive ? "show" : "hide";

  return (
    <div className={`${showOrHidePanel}`}>
      <ExitBtn func={setCalendarPanelActive} />
      <MyCalendar />
    </div>
  );
};

export default Calendar;
