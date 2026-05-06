function Input({ className = "", ...props }) {
  return (
    <input
      onWheel={(e) => e.target.blur()}
      {...props}
      className={`border border-grey-300 bg-grey-0 rounded-[5px] shadow-sm py-[0.8rem] px-[1.2rem] ${className}`}
    />
  );
}

export default Input;
