function Input({ ...props }) {
  return (
    <input
      onWheel={(e) => e.target.blur()}
      {...props}
      className="border border-grey-300 bg-grey-0 rounded-[5px] shadow-sm"
      style={{ padding: "0.8rem 1.2rem" }}
    />
  );
}

export default Input;
