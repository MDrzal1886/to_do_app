import { useContext } from "react";
import { AppContext } from "../AppContext";
import NavButton from "./NavButton";

const Navigation = () => {
  const { buttonTypes } = useContext(AppContext);

  const navButtons = buttonTypes.map((navButton) => (
    <NavButton key={navButton.id} {...navButton} />
  ));

  return <nav className="navigation">{navButtons}</nav>;
};

export default Navigation;
