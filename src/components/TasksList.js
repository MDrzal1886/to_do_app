import { useContext, useEffect, useRef } from "react";

import { AppContext } from "../AppContext";
import Task from "./Task";
import ExitBtn from "./ExitBtn";

const TasksList = () => {
  const { listPanelActive, tasks, setListPanelActive } = useContext(AppContext);

  const showOrHidePanel = () => {
    if (listPanelActive === false) {
      return "hide";
    } else if (listPanelActive === true) {
      return "show";
    } else {
      return "";
    }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [listPanelActive]);

  const tasksElements = tasks.map((task) => <Task key={task.id} {...task} />);

  return (
    <div ref={containerRef} className={`${showOrHidePanel()} panelContainer`}>
      <ExitBtn func={setListPanelActive} />
      {tasks.length > 0 ? (
        <>
          <ul className="tasksListContainer">
            <h1>Lista zadań</h1>
            {tasksElements}
          </ul>
        </>
      ) : (
        <h2>Nie masz żadnych zadań :(</h2>
      )}
    </div>
  );
};

export default TasksList;
