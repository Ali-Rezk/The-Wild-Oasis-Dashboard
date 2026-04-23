import { HiXMark } from "react-icons/hi2";

export default function Modal({ children, onClose, title }) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 w-full h-screen bg-(--backdrop-color) backdrop-blur-sm z-1000 transition-all duration-500"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-grey-0 rounded-(--border-radius-lg) shadow-(--shadow-lg) px-16 py-[3.2rem] transition-all duration-500"
      >
        <button
          onClick={onClose}
          className="bg-transparent border-none p-[0.4rem] rounded-(--border-radius-sm) translate-x-[0.8rem] transition-all duration-200 absolute top-[1.2rem] right-[1.9rem] hover:bg-grey-100 [&_svg]:w-[2.4rem] [&_svg]:h-[2.4rem] [&_svg]:text-grey-500"
        >
          <HiXMark className="w-8 h-8" />
        </button>
        {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
