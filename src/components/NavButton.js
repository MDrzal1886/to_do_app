import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppContext } from "../AppContext";

import AddTask from "./AddTask";
import TasksList from "./TasksList";
import Calendar from "./Calendar";
import { useContext } from "react";

const NavButton = (props) => {
  const { handleNavButtonClick } = useContext(AppContext);

  const panelElement = () => {
    if (props.type) {
      switch (props.type) {
        case "add":
          return <AddTask />;
        case "list":
          return <TasksList />;
        case "calendar":
          return <Calendar />;
        default:
          return;
      }
    }
  };

  return (
    <div>
      <div>
        <p>{props.name}</p>
        <button onClick={() => handleNavButtonClick(props.type)}>
          <FontAwesomeIcon icon={props.icon} />
        </button>
      </div>
      {panelElement()}
    </div>
  );
};

export default NavButton;
