import Logout from "../features/authentication/Logout";
import UserAvatar from "../features/authentication/UserAvatar";
import HeaderMenu from "./HeaderMenu";

function Header() {
  return (
    <header className="flex gap-9 justify-end bg-grey-0 border-b border-grey-100 py-5 px-20">
      <UserAvatar
        user={{ user_metadata: { fullName: "John Doe", avatar: null } }}
      />
      <HeaderMenu />
    </header>
  );
}

export default Header;
