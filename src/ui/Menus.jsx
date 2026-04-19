import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider value={{ openId, close, open, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return (
    <div className="flex items-center justify-end">{children}</div>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: Math.round(window.innerWidth - rect.width - rect.x),
      y: Math.round(rect.y + rect.height + 8),
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-transparent border-none p-[0.4rem] rounded-[5px] translate-x-[0.8rem] transition-all duration-200 hover:bg-grey-100 [&_svg]:w-[2.4rem] [&_svg]:h-[2.4rem] [&_svg]:text-grey-700"
    >
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  if (openId !== id) return null;

  return createPortal(
    <ul
      className="fixed bg-grey-0 rounded-[7px]"
      style={{
        boxShadow: "var(--shadow-md)",
        right: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onClick={close}
    >
      {children}
    </ul>,
    document.body
  );
}

function Button({ children, icon, onClick, disabled }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        disabled={disabled}
        onClick={handleClick}
        className="w-full text-left bg-transparent border-none text-[1.4rem] transition-all duration-200 flex items-center gap-[1.6rem] hover:bg-grey-50 [&_svg]:w-[1.6rem] [&_svg]:h-[1.6rem] [&_svg]:text-grey-400 [&_svg]:transition-all [&_svg]:duration-300"
        style={{ padding: "1.2rem 2.4rem" }}
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
