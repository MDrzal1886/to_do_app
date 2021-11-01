import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [addPanelActive, setAddPanelActive] = useState(false);
  const [listPanelActive, setListPanelActive] = useState(false);
  const [calendarPanelActive, setCalendarPanelActive] = useState(false);
  const [events, setEvents] = useState([
    { title: "jeden", date: "2021-11-01" },
    { title: "dwa", date: "2021-11-02" },
  ]);

  const handleNavButtonClick = (type) => {
    if (type) {
      switch (type) {
        case "add":
          setListPanelActive(false);
          setCalendarPanelActive(false);
          return setAddPanelActive(true);
        case "list":
          setAddPanelActive(false);
          setCalendarPanelActive(false);
          return setListPanelActive(true);
        case "calendar":
          setAddPanelActive(false);
          setListPanelActive(false);
          return setCalendarPanelActive(true);
        default:
          return;
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        addPanelActive,
        listPanelActive,
        calendarPanelActive,
        events,
        setEvents,
        handleNavButtonClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
