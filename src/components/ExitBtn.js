import { useContext } from "react";

import { AppContext } from "../AppContext";

const ExitBtn = ({ func, clear, added }) => {
  const { handleExitBtn } = useContext(AppContext);

  return (
    <button
      className="exitButton"
      onClick={() => {
        handleExitBtn(func);
        if (clear) {
          clear();
        }
        if (added) {
          added(false);
        }
      }}
    >
      X
    </button>
  );
};

export default ExitBtn;
