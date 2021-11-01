import { useState, useContext } from "react";

import { AppContext } from "../AppContext";

const EditPanel = ({ task, setEditMode }) => {
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDate, setEditDate] = useState(task.date);
  const [editDescription, setEditDescription] = useState(
    task.description ? task.description : ""
  );

  const { setTasks, tasks } = useContext(AppContext);

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const editTask = {
      id: task.id,
      title: editTitle,
      date: editDate,
      description: editDescription,
    };

    const editTasks = tasks.filter((task) => task.id !== editTask.id);
    setTasks([...editTasks, editTask]);
    setEditMode(false);
  };

  return (
    <div>
      <form onSubmit={handleEditSubmit}>
        <input
          type="text"
          value={editTitle}
          onChange={(event) => setEditTitle(event.target.value)}
        />
        {editTitle.length < 1 ? <span>Pole obowiązkowe</span> : null}
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={editDate}
          onChange={(event) => setEditDate(event.target.value)}
        />
        {editDate.length < 1 ? <span>Pole obowiązkowe</span> : null}
        <input
          type="textarea"
          value={editDescription}
          onChange={(event) => setEditDescription(event.target.value)}
        />
        <button type="submit">Edytuj zadanie</button>
      </form>
    </div>
  );
};

export default EditPanel;
