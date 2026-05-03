import { HiOutlineUser } from "react-icons/hi";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

export default function HeaderMenu() {
  const navigate = useNavigate();
  return (
    <ul className="flex gap-2">
      <li>
        <ButtonIcon onClick={() => navigate("/account")} aria-label="Account">
          <HiOutlineUser className="w-5 h-5" />
        </ButtonIcon>
      </li>
      <li>
        <DarkModeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}
