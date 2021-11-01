import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../AppContext";

import EditPanel from "./EditPanel";

const Task = (task) => {
  const { handleDelateBtn } = useContext(AppContext);

  const [editMode, setEditMode] = useState(false);

  const handleEditBtn = () => {
    setEditMode((prev) => !prev);
  };
  return (
    <li>
      <h3>{task.title}</h3>
      <p>{task.date}</p>
      {task.description ? <p>{task.description}</p> : null}
      <button onClick={handleEditBtn}>
        <FontAwesomeIcon icon={faEdit} />
      </button>
      <button onClick={() => handleDelateBtn(task.id)}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </button>
      {editMode ? <EditPanel task={task} setEditMode={setEditMode} /> : null}
    </li>
  );
};

export default Task;
