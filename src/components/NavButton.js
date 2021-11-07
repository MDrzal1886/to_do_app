import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AppContext } from "../AppContext";

const NavButton = (navButton) => {
  const { handleNavButtonClick } = useContext(AppContext);

  return (
    <div className="navButtonContainer">
      <button
        onClick={() => handleNavButtonClick(navButton.type)}
        className="navButton"
      >
        <FontAwesomeIcon icon={navButton.icon} />
      </button>
      {navButton.component}
    </div>
  );
};

export default NavButton;
