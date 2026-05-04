function DashboardBox({ children, className = "" }) {
  return (
    <div
      className={`bg-grey-0 border border-grey-100 rounded-[7px] flex flex-col gap-[2.4rem] p-[3.2rem] ${className}`}
    >
      {children}
    </div>
  );
}

export default DashboardBox;
