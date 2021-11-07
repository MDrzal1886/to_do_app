import { useContext, useEffect, useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppContext } from "../AppContext";

import ExitBtn from "./ExitBtn";

const AddTask = () => {
  const {
    addPanelActive,
    setTasks,
    setAddPanelActive,
    clickedDate,
    setDayTasksPanelActive,
    todayDate,
    setClickedDate,
    calendarPanelActive,
  } = useContext(AppContext);

  const [titleInputValue, setTitleInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState("");
  const [descriptionInputValue, setDescriptionInputValue] = useState("");
  const [titleValidate, setTitleValidate] = useState(false);
  const [dateValidate, setDateValidate] = useState(false);
  const [taskAdded, setTaskAdded] = useState(false);

  useEffect(() => {
    if (clickedDate && calendarPanelActive) {
      setDateInputValue(clickedDate);
    } else if (!calendarPanelActive) {
      setDateInputValue(todayDate);
    }
  }, [clickedDate, calendarPanelActive, todayDate]);

  const showOrHidePanel = () => {
    if (addPanelActive === false) {
      return "hide";
    } else if (addPanelActive === true) {
      return "show";
    } else {
      return "";
    }
  };

  const clearInputs = () => {
    setTitleInputValue("");
    setDateInputValue(todayDate);
    setDescriptionInputValue("");
    setTitleValidate(false);
    setDateValidate(false);
  };

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
        id: (
          Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
        ).toUpperCase(),
        title: titleInputValue,
        date: dateInputValue,
        description: descriptionInputValue,
      };

      setTasks((prev) => [...prev, newTask]);

      setTaskAdded(true);
      clearInputs();
      setClickedDate("");
      setDayTasksPanelActive(false);
      setTimeout(() => {
        setTaskAdded(false);
        setAddPanelActive(false);
      }, 1500);
    }
  };

  const fromOrMessage = taskAdded ? (
    <>
      <h2>Zadanie dodane!</h2>
    </>
  ) : (
    <>
      <h1>Dodaj zadanie</h1>
      <form onSubmit={handleAddTaskBtn} className="addPanelContainer">
        <input
          className={`${
            titleValidate && titleInputValue === "" ? "validate" : ""
          } addPanelInput`}
          type="text"
          placeholder="nazwa zadania"
          value={titleInputValue}
          onChange={(event) => setTitleInputValue(event.target.value)}
        />

        <input
          className={`${
            dateValidate && dateInputValue === "" ? "validate" : ""
          } addPanelInput`}
          type="date"
          min={todayDate}
          value={dateInputValue}
          onChange={(event) => setDateInputValue(event.target.value)}
        />

        <textarea
          className="addPanelInput textarea"
          placeholder="opis zadania"
          value={descriptionInputValue}
          onChange={(event) => setDescriptionInputValue(event.target.value)}
        />
        <button type="submit" className="navButton light-color">
          <FontAwesomeIcon icon={faPlusCircle} />
        </button>
      </form>
    </>
  );

  return (
    <div className={`${showOrHidePanel()} panelContainer frontZIndex`}>
      <ExitBtn
        func={setAddPanelActive}
        clear={clearInputs}
        added={setTaskAdded}
      />

      {fromOrMessage}
    </div>
  );
};

export default AddTask;
