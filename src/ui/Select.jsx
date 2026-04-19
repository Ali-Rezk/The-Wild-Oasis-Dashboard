function Select({ options, value, onChange, type = "default" }) {
  const borderClass = type === "white" ? "border-grey-100" : "border-grey-300";

  return (
    <select
      value={value}
      onChange={onChange}
      className={`text-[1.4rem] border ${borderClass} rounded-[5px] bg-grey-0 font-medium shadow-sm`}
      style={{ padding: "0.8rem 1.2rem" }}
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
