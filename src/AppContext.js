import { createContext, useEffect, useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import AddTask from "./components/AddTask";
import TasksList from "./components/TasksList";
import Calendar from "./components/Calendar";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [addPanelActive, setAddPanelActive] = useState(null);
  const [listPanelActive, setListPanelActive] = useState(null);
  const [calendarPanelActive, setCalendarPanelActive] = useState(null);
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(Date.now() - tzoffset)
    .toISOString()
    .slice(0, -1)
    .split("T")[0];
  const [todayDate, setTodayDate] = useState(localISOTime);
  const sampleDate = (daysAdded) => {
    const sampleDateTask = new Date(todayDate);
    sampleDateTask.setDate(sampleDateTask.getDate() + daysAdded);
    return sampleDateTask.toISOString().split("T")[0];
  };
  const [tasks, setTasks] = useState([
    {
      id: "KVN6479JPX6JI",
      title: "Wynieść śmieci",
      date: todayDate,
      description: "Przykładowe zadanie 1",
    },
    {
      id: "KVN6279JDX1WE",
      title: "Umyć samochód",
      date: sampleDate(3),
      description: "Przykładowe zadanie 2",
    },
    {
      id: "KVN6779GPW2JI",
      title: "Zrobić trening",
      date: sampleDate(6),
      description: "Przykładowe zadanie 3",
    },
    {
      id: "KVN647F5P46TI",
      title: "Kolacja ze znajomymi",
      date: sampleDate(6),
      description: "Przykładowe zadanie 4",
    },
    {
      id: "KEN247W5P46TI",
      title: "Spacer",
      date: sampleDate(6),
      description: "Przykładowe zadanie 5",
    },
  ]);
  const [dayTasksPanelActive, setDayTasksPanelActive] = useState(false);
  const [clickedDate, setClickedDate] = useState("");

  useEffect(() => {
    if (todayDate < new Date().toISOString().split("T")[0]) {
      setTodayDate(new Date().toISOString().split("T")[0]);
    }
  }, [todayDate, addPanelActive, listPanelActive, calendarPanelActive]);

  const buttonTypes = [
    {
      id: 1,
      type: "add",
      icon: faPlusCircle,
      component: <AddTask />,
      active: addPanelActive,
    },
    {
      id: 2,
      type: "list",
      icon: faClipboardList,
      component: <TasksList />,
      active: listPanelActive,
    },
    {
      id: 3,
      type: "calendar",
      icon: faCalendar,
      component: <Calendar />,
      active: calendarPanelActive,
    },
  ];

  const sortTasksFunc = (a, b) => {
    const sortByTitle = () => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (b.title.toLowerCase() < a.title.toLowerCase()) {
        return 1;
      }
      return 0;
    };
    return new Date(a.date) - new Date(b.date) || sortByTitle();
  };

  useEffect(() => {
    const tasksSort = tasks.sort((a, b) => sortTasksFunc(a, b));
    setTasks(tasksSort);
  }, [tasks]);

  const handleDelateBtn = (id) => {
    const tasksAfterDelate = tasks.filter((task) => task.id !== id);
    setTasks(tasksAfterDelate);
  };

  const handleNavButtonClick = (type) => {
    if (type) {
      switch (type) {
        case "add":
          setListPanelActive(null);
          setCalendarPanelActive(null);
          return setAddPanelActive(true);
        case "list":
          setAddPanelActive(null);
          setCalendarPanelActive(null);
          return setListPanelActive(true);
        case "calendar":
          setAddPanelActive(null);
          setListPanelActive(null);
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
        buttonTypes,
        addPanelActive,
        listPanelActive,
        calendarPanelActive,
        setListPanelActive,
        setCalendarPanelActive,
        setAddPanelActive,
        sortTasksFunc,
        tasks,
        setTasks,
        handleDelateBtn,
        handleNavButtonClick,
        dayTasksPanelActive,
        setDayTasksPanelActive,
        handleExitBtn,
        clickedDate,
        setClickedDate,
        todayDate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
