function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <div className="flex gap-[1.6rem]">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="accent-brand-600 outline-offset-2"
        style={{ height: "2.4rem", width: "2.4rem" }}
      />
      <label
        htmlFor={!disabled ? id : ""}
        className="flex-1 flex items-center gap-[0.8rem]"
      >
        {children}
      </label>
    </div>
  );
}

export default Checkbox;
