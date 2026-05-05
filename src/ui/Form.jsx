function Form({ children, onSubmit, type, className }) {
  const isModal = type === "modal";

  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden text-[1.4rem] ${
        isModal
          ? "w-full max-w-7xl"
          : "bg-grey-0 border border-grey-100 rounded-[7px] px-[1.6rem] py-[2.4rem] sm:px-16"
      } ${className}`}
    >
      {children}
    </form>
  );
}

export default Form;
