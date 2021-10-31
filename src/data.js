import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export const buttonTypes = [
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
