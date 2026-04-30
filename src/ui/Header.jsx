import Logout from "../features/authentication/Logout";

function Header() {
  return (
    <header className="bg-grey-0 border-b border-grey-100 py-5 px-20">
      <Logout />
    </header>
  );
}

export default Header;
