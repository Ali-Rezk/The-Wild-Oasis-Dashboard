const colorVariants = {
  blue: "bg-[var(--color-blue-100)] text-[var(--color-blue-700)]",
  green: "bg-[var(--color-green-100)] text-[var(--color-green-700)]",
  yellow: "bg-[var(--color-yellow-100)] text-[var(--color-yellow-700)]",
  silver: "bg-[var(--color-silver-100)] text-[var(--color-silver-700)]",
  indigo: "bg-[var(--color-indigo-100)] text-[var(--color-indigo-700)]",
  red: "bg-[var(--color-red-100)] text-[var(--color-red-700)]",
};

function Stat({ icon, title, value, color }) {
  return (
    <div className="grid grid-cols-[6.4rem_1fr] grid-rows-[auto_auto] gap-x-[1.6rem] gap-y-[0.4rem] rounded-[7px] border border-grey-100 bg-grey-0 p-[1.6rem]">
      <div
        className={`row-span-2 flex aspect-square items-center justify-center rounded-full [&_svg]:h-[3.2rem] [&_svg]:w-[3.2rem] ${colorVariants[color]}`}
      >
        {icon}
      </div>

      <h5 className="self-end text-[1.2rem] font-semibold uppercase tracking-[0.4px] text-grey-500">
        {title}
      </h5>

      <p className="text-[2.4rem] font-medium leading-none">{value}</p>
    </div>
  );
}

export default Stat;
