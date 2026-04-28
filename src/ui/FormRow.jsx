function FormRow({ label, error, children, orientation = "horizontal" }) {
  orientation === "vertical"
    ? (orientation = "grid grid-cols-1 gap-[0.8rem] items-start")
    : (orientation =
        "grid items-center gap-[2.4rem] border-b border-grey-100 last:border-0 py-[1.2rem] first:pt-0 last:pb-0 grid-cols-[24rem_1fr_1.2fr]");
  return (
    <div className={orientation}>
      {label && (
        <label htmlFor={children.props?.id} className="font-medium ">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[1.4rem] text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
