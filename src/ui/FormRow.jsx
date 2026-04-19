function FormRow({ label, error, children, orientation }) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={`grid items-center ${
        isVertical
          ? "gap-[0.8rem]"
          : "gap-[2.4rem] border-b border-grey-100 last:border-0"
      } py-[1.2rem] first:pt-0 last:pb-0`}
      style={{
        gridTemplateColumns: isVertical ? "1fr" : "24rem 1fr 1.2fr",
      }}
    >
      {label && (
        <label htmlFor={children.props?.id} className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-[1.4rem] text-red-700">{error}</span>}
    </div>
  );
}

export default FormRow;
