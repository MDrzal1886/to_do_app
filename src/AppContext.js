import { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [addPanelActive, setAddPanelActive] = useState(false);
  const [listPanelActive, setListPanelActive] = useState(false);
  const [calendarPanelActive, setCalendarPanelActive] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, title: "jeden", date: "2021-11-01" },
    { id: 2, title: "dwa", date: "2021-11-05" },
    { id: 3, title: "rwe", date: "2021-11-01" },
    { id: 4, title: "sfdgf", date: "2021-11-02" },
  ]);
  const [dayTasksPanelActive, setDayTasksPanelActive] = useState(false);

  const handleDelateBtn = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    newTasks.map((task, index) => (task.id = index + 1));
    setTasks(newTasks);
  };

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

  const handleExitBtn = (func) => {
    func(false);
  };

  return (
    <AppContext.Provider
      value={{
        addPanelActive,
        listPanelActive,
        calendarPanelActive,
        setListPanelActive,
        setCalendarPanelActive,
        setAddPanelActive,
        tasks,
        setTasks,
        handleDelateBtn,
        handleNavButtonClick,
        dayTasksPanelActive,
        setDayTasksPanelActive,
        handleExitBtn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
