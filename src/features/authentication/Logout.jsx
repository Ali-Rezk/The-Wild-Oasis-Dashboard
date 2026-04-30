import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useAuth";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { mutate: logout, isLoading } = useLogout();

  function handleLogout() {
    logout();
  }
  return (
    <ButtonIcon onClick={handleLogout} disabled={isLoading}>
      {isLoading ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}
