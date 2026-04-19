function DataItem({ icon, label, children }) {
  return (
    <div
      className="flex items-center gap-[1.6rem]"
      style={{ padding: "0.8rem 0" }}
    >
      <span className="flex items-center gap-[0.8rem] font-medium [&_svg]:w-8 [&_svg]:h-8 [&_svg]:text-brand-600">
        {icon}
        <span>{label}</span>
      </span>
      {children}
    </div>
  );
}

export default DataItem;
