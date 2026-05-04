import { HiOutlineBars3 } from "react-icons/hi2";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

function Header({ onMenuClick }) {
  return (
    <header className="flex items-center bg-grey-0 border-b border-grey-100 py-5 px-6 lg:px-20">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-[5px] hover:bg-grey-100 text-grey-600 mr-auto"
        aria-label="Toggle menu"
      >
        <HiOutlineBars3 className="w-6 h-6" />
      </button>
      <div className="flex items-center gap-9 ml-auto">
        <UserAvatar
          user={{ user_metadata: { fullName: "John Doe", avatar: null } }}
        />
        <HeaderMenu />
      </div>
    </header>
  );
}

export default Header;
