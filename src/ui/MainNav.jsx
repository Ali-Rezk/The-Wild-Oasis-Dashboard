import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const navLinks = [
  { to: "/dashboard", icon: <HiOutlineHome />, label: "Home" },
  { to: "/bookings", icon: <HiOutlineCalendarDays />, label: "Bookings" },
  { to: "/cabins", icon: <HiOutlineHomeModern />, label: "Cabins" },
  { to: "/users", icon: <HiOutlineUsers />, label: "Users" },
  { to: "/settings", icon: <HiOutlineCog6Tooth />, label: "Settings" },
];

function MainNav() {
  return (
    <nav>
      <ul className="flex flex-col gap-[0.8rem]">
        {navLinks.map(({ to, icon, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-[1.2rem] text-grey-600 font-medium transition-all duration-300 rounded-[5px] ${
                  isActive
                    ? "text-grey-800 bg-grey-50 [&_svg]:text-brand-600"
                    : "hover:text-grey-800 hover:bg-grey-50 hover:[&_svg]:text-brand-600"
                }`
              }
              style={{ fontSize: "1.6rem", padding: "1.2rem 2.4rem" }}
            >
              <span className="w-[2.4rem] h-[2.4rem] text-grey-400 transition-all duration-300">
                {icon}
              </span>
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default MainNav;
