import { useContext, useState } from "react";

import { AppContext } from "../AppContext";

const AddTask = () => {
  const { addPanelActive, setEvents, events, setAddPanelActive } =
    useContext(AppContext);
  const [titleInputValue, setTitleInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [titleValidate, setTitleValidate] = useState(false);
  const [dateValidate, setDateValidate] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  const showOrHidePanel = addPanelActive ? "show" : "hide";

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
      const newEvent = {
        id: events.length + 1,
        title: titleInputValue,
        date: dateInputValue,
        description: descriptionInputValue,
      };

      setEvents((prev) => [...prev, newEvent]);

      setTaskAdded(true);
      setTitleInputValue("");
      setDateInputValue("");
      setDescriptionInputValue("");
      setTimeout(() => {
        setTaskAdded(false);
        setAddPanelActive(false);
      }, 5000);
    }
  };

  const fromOrMessage = taskAdded ? (
    <h2>Zadanie dodane!</h2>
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
      <button type="submit">Dodaj zadanie</button>
    </form>
  );

  return <div className={`${showOrHidePanel}`}>{fromOrMessage}</div>;
};

export default AddTask;
