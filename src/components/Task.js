import { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { AppContext } from "../AppContext";

const Task = (task) => {
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDate, setEditDate] = useState(task.date);
  const [editDescription, setEditDescription] = useState(
    task.description ? task.description : ""
  );
  const {
    handleDelateBtn,
    setTasks,
    tasks,
    listPanelActive,
    todayDate,
    sortTasksFunc,
  } = useContext(AppContext);

  useEffect(() => {
    setEditTitle(task.title);
    setEditDate(task.date);
    setEditDescription(task.description ? task.description : "");
  }, [editMode, task]);

  useEffect(() => setEditMode(false), [listPanelActive]);

  const handleEditAccept = () => {
    const editTask = {
      id: task.id,
      title: editTitle,
      date: editDate,
      description: editDescription,
    };
    if (editTitle.length < 1 || editDate.length < 1 || editDate < todayDate)
      return;
    else {
      const editTasks = tasks.map((task) => {
        if (task.id !== editTask.id) {
          return task;
        } else {
          return editTask;
        }
      });
      const tasksSort = editTasks.sort((a, b) => sortTasksFunc(a, b));
      setTasks(tasksSort);
      setEditMode(false);
    }
  };

  const handleEditBtn = () => {
    setEditMode(true);
  };
  return (
    <li className="taskListElement">
      {editMode ? (
        <input
          className={`${editTitle.length < 1 ? "validate" : ""} editPanelInput`}
          type="text"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
        />
      ) : (
        <h3>{task.title}</h3>
      )}
      {editMode ? (
        <input
          className={`${
            editDate.length < 1 || editDate < todayDate ? "validate" : ""
          } editPanelInput`}
          type="date"
          min={todayDate}
          value={editDate}
          onChange={(event) => setEditDate(event.target.value)}
        />
      ) : (
        <p>{task.date}</p>
      )}
      {editMode ? (
        <textarea
          className="editPanelInput textarea"
          value={editDescription}
          onChange={(event) => setEditDescription(event.target.value)}
        />
      ) : task.description ? (
        <p>{task.description}</p>
      ) : null}
      <div className="buttonsContainer">
        <button
          onClick={editMode ? handleEditAccept : handleEditBtn}
          className="listElementButton"
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          onClick={() =>
            editMode ? setEditMode(false) : handleDelateBtn(task.id)
          }
          className="listElementButton"
        >
          {editMode ? "X" : <FontAwesomeIcon icon={faTrashAlt} />}
        </button>
      </div>
    </li>
  );
};

export default Task;
