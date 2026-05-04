function TableOperations({ children, className = "" }) {
  return (
    <div className={`flex flex-wrap items-center gap-[1.6rem] ${className}`}>
      {children}
    </div>
  );
}

export default TableOperations;
