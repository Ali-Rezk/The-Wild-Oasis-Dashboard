import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="grid h-screen grid-cols-[26rem_1fr] grid-rows-[auto_1fr]">
      <Header />
      <Sidebar />
      <main className="bg-grey-50  pt-16 px-[4.8rem] pb-[6.4rem] overflow-y-scroll mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
