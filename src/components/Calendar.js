import { useContext } from "react";

import { AppContext } from "../AppContext";

const Calendar = () => {
  const { calendarPanelActive } = useContext(AppContext);

  const showOrHidePanel = calendarPanelActive ? "show" : "hide";

  return (
    <div className={`${showOrHidePanel}`}>
      <p>kalendarz</p>
    </div>
  );
};

export default Calendar;
