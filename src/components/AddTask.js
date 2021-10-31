import { useContext } from "react";

import { AppContext } from "../AppContext";

const AddTask = () => {
  const { addPanelActive } = useContext(AppContext);

  const showOrHidePanel = addPanelActive ? "show" : "hide";
  return (
    <div className={`${showOrHidePanel}`}>
      <p>Dodaj zadanie</p>
    </div>
  );
};

export default AddTask;
