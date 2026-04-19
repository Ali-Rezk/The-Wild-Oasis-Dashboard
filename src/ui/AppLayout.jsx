import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div
      className="grid h-screen"
      style={{ gridTemplateColumns: "26rem 1fr", gridTemplateRows: "auto 1fr" }}
    >
      <Header />
      <Sidebar />
      <main className="bg-grey-50" style={{ padding: "4rem 4.8rem 6.4rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
