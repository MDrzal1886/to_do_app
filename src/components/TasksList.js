import { useContext } from "react";

import { AppContext } from "../AppContext";
import Task from "./Task";
import ExitBtn from "./ExitBtn";

const TasksList = () => {
  const { listPanelActive, tasks, setListPanelActive } = useContext(AppContext);

  const showOrHidePanel = listPanelActive ? "show" : "hide";

  const tasksSort = [...tasks].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const tasksElements = tasksSort.map((task) => (
    <Task key={task.id} {...task} />
  ));

  return (
    <div className={`${showOrHidePanel}`}>
      <ExitBtn func={setListPanelActive} />
      {tasks.length > 0 ? (
        <ul>{tasksElements}</ul>
      ) : (
        <h2>Nie masz żadnych zadań :(</h2>
      )}
    </div>
  );
};

export default TasksList;
