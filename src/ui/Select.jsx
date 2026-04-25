function Select({ options, value, onChange, type = "default", ...props }) {
  const borderClass = type === "white" ? "border-grey-100" : "border-grey-300";

  return (
    <select
      value={value}
      onChange={onChange}
      className={`text-[1.4rem] border ${borderClass} rounded-[5px] bg-grey-0 font-medium shadow-sm px-3.5 py-5`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
