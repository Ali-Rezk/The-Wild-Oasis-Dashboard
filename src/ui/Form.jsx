function Form({ children, onSubmit, type, className }) {
  const isModal = type === "modal";

  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden text-[1.4rem] ${
        isModal ? "w-7xl" : "bg-grey-0 border border-grey-100 rounded-[7px]"
      } ${className}`}
      style={!isModal ? { padding: "2.4rem 4rem" } : {}}
    >
      {children}
    </form>
  );
}

export default Form;
