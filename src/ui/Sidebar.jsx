import Uploader from "../data/Uploader";
import Logo from "./Logo";
import MainNav from "./MainNav";

function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`bg-grey-0 border-r border-grey-100 flex flex-col gap-[3.2rem] p-[3.2rem_2.4rem] [grid-row:1/-1]
          fixed inset-y-0 left-0 z-50 w-[26rem]
          lg:static lg:z-auto
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <Logo />
        <MainNav />
        <Uploader />
      </aside>
    </>
  );
}

export default Sidebar;
