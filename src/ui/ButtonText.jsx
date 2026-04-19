function ButtonText({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-brand-600 font-medium text-center transition-all duration-300 bg-transparent border-none rounded-[5px] hover:text-brand-700 active:text-brand-700"
    >
      {children}
    </button>
  );
}

export default ButtonText;
