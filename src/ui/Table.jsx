import { createContext, useContext } from "react";

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="border border-grey-200 text-[1.4rem] bg-grey-0 rounded-[7px] overflow-hidden"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <header
      className="grid items-center gap-x-[2.4rem] py-[1.6rem] px-[2.4rem] bg-grey-50 border-b border-grey-100 uppercase font-semibold text-grey-600"
      style={{ gridTemplateColumns: columns, letterSpacing: "0.4px" }}
      role="row"
    >
      {children}
    </header>
  );
}

function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      className="grid items-center gap-x-[2.4rem] py-[1.2rem] px-[2.4rem] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-grey-100"
      style={{ gridTemplateColumns: columns }}
      role="row"
    >
      {children}
    </div>
  );
}

function Body({ data, render }) {
  if (!data || data.length === 0)
    return (
      <p className="text-[1.6rem] font-medium text-center" style={{ margin: "2.4rem" }}>
        No data to show at the moment
      </p>
    );

  return <section style={{ margin: "0.4rem 0" }}>{data.map(render)}</section>;
}

function Footer({ children }) {
  return (
    <footer className="bg-grey-50 flex justify-center p-[1.2rem] empty:hidden">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
