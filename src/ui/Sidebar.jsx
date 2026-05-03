import Uploader from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar() {
  return (
    <aside
      className="bg-grey-0 border-r border-grey-100 flex flex-col gap-[3.2rem]"
      style={{ padding: "3.2rem 2.4rem", gridRow: "1 / -1" }}
    >
      <Logo />
      <MainNav />
      <Uploader />
    </aside>
  );
}

export default Sidebar;
