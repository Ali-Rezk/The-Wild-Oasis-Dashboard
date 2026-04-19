function Stat({ icon, title, value, color }) {
  return (
    <div
      className="bg-grey-0 border border-grey-100 rounded-[7px] grid"
      style={{
        padding: "1.6rem",
        gridTemplateColumns: "6.4rem 1fr",
        gridTemplateRows: "auto auto",
        columnGap: "1.6rem",
        rowGap: "0.4rem",
      }}
    >
      <div
        className="row-span-2 aspect-square rounded-full flex items-center justify-center [&_svg]:w-[3.2rem] [&_svg]:h-[3.2rem]"
        style={{
          backgroundColor: `var(--color-${color}-100)`,
          color: `var(--color-${color}-700)`,
        }}
      >
        {icon}
      </div>

      <h5
        className="self-end uppercase font-semibold text-grey-500"
        style={{ fontSize: "1.2rem", letterSpacing: "0.4px" }}
      >
        {title}
      </h5>

      <p className="font-medium leading-none" style={{ fontSize: "2.4rem" }}>
        {value}
      </p>
    </div>
  );
}

export default Stat;
