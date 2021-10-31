import NavButton from "./NavButton";

import { buttonTypes } from "../data";

const Navigation = () => {
  const navButtons = buttonTypes.map((navButton) => (
    <NavButton key={navButton.id} {...navButton} />
  ));

  return <nav className="navigation">{navButtons}</nav>;
};

export default Navigation;
