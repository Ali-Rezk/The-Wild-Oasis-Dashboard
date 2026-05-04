import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="grid h-screen lg:grid-cols-[26rem_1fr] grid-rows-[auto_1fr]">
      <Header onMenuClick={() => setSidebarOpen((o) => !o)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="bg-grey-50 pt-8 px-4 sm:px-8 lg:pt-16 lg:px-[4.8rem] pb-[6.4rem] overflow-y-scroll w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
