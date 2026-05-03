import { useDarkMode } from "../context/darkModeContext";
import logoLight from "../data/img/logo-light.png";
import logoDark from "../data/img/logo-dark.png";

function Logo() {
  const { darkMode } = useDarkMode();
  return (
    <div className="text-center">
      <img
        src={darkMode ? logoDark : logoLight}
        alt="Logo"
        style={{ height: "9.6rem", width: "auto" }}
      />
    </div>
  );
}

export default Logo;
