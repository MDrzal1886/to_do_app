import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

import NavButton from "./NavButton";

const buttonTypes = [
  {
    id: 1,
    type: "add",
    icon: faPlusCircle,
    name: "Dodaj zadanie",
  },
  {
    id: 2,
    type: "list",
    icon: faClipboardList,
    name: "Lista zadań",
  },
  {
    id: 3,
    type: "calendar",
    icon: faCalendar,
    name: "Kalendarz",
  },
];

const Navigation = () => {
  const navButtons = buttonTypes.map((navButton) => (
    <NavButton key={navButton.id} {...navButton} />
  ));

  return <nav className="navigation">{navButtons}</nav>;
};

export default Navigation;
