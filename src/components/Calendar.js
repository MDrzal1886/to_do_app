import { useContext } from "react";

import { AppContext } from "../AppContext";

import MyCalendar from "./MyCalendar";

const Calendar = () => {
  const { calendarPanelActive } = useContext(AppContext);

  const showOrHidePanel = calendarPanelActive ? "show" : "hide";

  return (
    <div className={`${showOrHidePanel}`}>
      <MyCalendar />
    </div>
  );
};

export default Calendar;
