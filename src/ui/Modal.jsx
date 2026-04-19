import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Toggle({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  if (name !== openName) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-[var(--backdrop-color)] backdrop-blur-[4px] z-[1000] transition-all duration-500"
      onClick={close}
    >
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-grey-0 rounded-[9px] shadow-lg transition-all duration-500"
        style={{ padding: "3.2rem 4rem" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="bg-transparent border-none p-[0.4rem] rounded-[5px] translate-x-[0.8rem] transition-all duration-200 absolute top-[1.2rem] right-[1.9rem] hover:bg-grey-100 [&_svg]:w-[2.4rem] [&_svg]:h-[2.4rem] [&_svg]:text-grey-500"
        >
          <HiXMark />
        </button>

        <div>
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </div>,
    document.body
  );
}

Modal.Toggle = Toggle;
Modal.Window = Window;

export default Modal;
