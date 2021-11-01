import { useContext, useState } from "react";

import { AppContext } from "../AppContext";

import ExitBtn from "./ExitBtn";

const AddTask = ({ calendarActive, date }) => {
  const { addPanelActive, setTasks, tasks, setAddPanelActive } =
    useContext(AppContext);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState(date ? date : "");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [titleValidate, setTitleValidate] = useState(false);
  const [dateValidate, setDateValidate] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  const showOrHidePanel = addPanelActive || calendarActive ? "show" : "hide";

  const handleAddTaskBtn = (event) => {
    event.preventDefault();
    if (titleInputValue === "" || dateInputValue === "") {
      if (titleInputValue === "") {
        setTitleValidate(true);
      } else {
        setTitleValidate(false);
      }
      if (dateInputValue === "") {
        setDateValidate(true);
      } else {
        setDateValidate(false);
      }
    } else {
      const newTask = {
        id: tasks.length + 1,
        title: titleInputValue,
        date: dateInputValue,
        description: descriptionInputValue,
      };

      setTasks((prev) => [...prev, newTask]);

      setTaskAdded(true);
      setTitleInputValue("");
      setDateInputValue("");
      setDescriptionInputValue("");
    }
  };

  const fromOrMessage = taskAdded ? (
    <>
      <ExitBtn func={setTaskAdded} />
      <h2>Zadanie dodane!</h2>
    </>
  ) : (
    <form onSubmit={handleAddTaskBtn}>
      <label>
        Nazwa zadania:
        <input
          type="text"
          value={titleInputValue}
          onChange={(event) => setTitleInputValue(event.target.value)}
        />
        {titleValidate ? <span>Pole obowiązkowe</span> : null}
      </label>
      <label>
        Data zadania:
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={dateInputValue}
          onChange={(event) => setDateInputValue(event.target.value)}
        />
        {dateValidate ? <span>Pole obowiązkowe</span> : null}
      </label>
      <label>
        Opis zadania:
        <input
          type="textarea"
          value={descriptionInputValue}
          onChange={(event) => setDescriptionInputValue(event.target.value)}
        />
      </label>
      <button type="submit">Dodaj</button>
    </form>
  );

  return (
    <div className={`${showOrHidePanel}`}>
      {calendarActive ? null : <ExitBtn func={setAddPanelActive} />}
      {fromOrMessage}
    </div>
  );
};

export default AddTask;
