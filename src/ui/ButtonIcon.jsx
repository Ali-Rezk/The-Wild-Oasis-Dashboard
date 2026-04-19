function ButtonIcon({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-transparent border-none p-[0.6rem] rounded-[5px] transition-all duration-200 hover:bg-grey-100 [&_svg]:w-[2.2rem] [&_svg]:h-[2.2rem] [&_svg]:text-brand-600"
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
