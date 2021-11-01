import { useContext } from "react";

import { AppContext } from "../AppContext";

const ExitBtn = ({ func }) => {
  const { handleExitBtn } = useContext(AppContext);

  return <button onClick={() => handleExitBtn(func)}>X</button>;
};

export default ExitBtn;
