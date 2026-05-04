import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ className, children, columns }) {
  return (
    <TableContext.Provider className={className} value={{ columns }}>
      <div className="border border-grey-200 text-[1.4rem] bg-grey-0 rounded-[7px] overflow-hidden overflow-x-auto">
        <div className="min-w-max">{children}</div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children, className = "" }) {
  const { columns } = useContext(TableContext);
  return (
    <header
      className={`grid ${columns} text-center gap-x-10 items-center bg-grey-50 border-b border-grey-100 uppercase tracking-[0.4px] font-semibold text-grey-600 px-[2.4rem] py-[1.6rem] ${className}`}
    >
      {children}
    </header>
  );
}

function Row({ children, className }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className={`grid ${columns} items-center gap-x-[2.4rem] py-[1.2rem] px-[2.4rem] not-last:border-b not-last:border-grey-100 ${className}`}
    >
      {children}
    </div>
  );
}

function Body({ data, render, className }) {
  if (!data || data.length === 0)
    return (
      <p className="text-[1.6rem] font-medium text-center m-[2.4rem]">
        No data to show at the moment
      </p>
    );

  return <section className={className}>{data.map(render)}</section>;
}

function Footer({ children, className }) {
  return (
    <footer
      className={`bg-grey-50 flex justify-center p-[1.2rem] empty:hidden ${className}`}
    >
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
