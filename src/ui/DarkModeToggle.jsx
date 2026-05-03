import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/darkModeContext";

export default function DarkModeToggle() {
  const { toggleDarkMode, darkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
      {darkMode ? <HiOutlineMoon /> : <HiOutlineSun />}
    </ButtonIcon>
  );
}
