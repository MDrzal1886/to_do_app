import { useContext } from "react";

import { AppContext } from "../AppContext";

const TasksList = () => {
  const { listPanelActive } = useContext(AppContext);

  const showOrHidePanel = listPanelActive ? "show" : "hide";

  return (
    <div className={`${showOrHidePanel}`}>
      <p>lista zadan</p>
    </div>
  );
};

export default TasksList;
