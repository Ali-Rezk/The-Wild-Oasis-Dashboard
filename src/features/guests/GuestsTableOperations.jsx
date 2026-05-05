import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiMagnifyingGlass } from "react-icons/hi2";
import TableOperations from "../../ui/TableOperations";

export default function GuestsTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(
    searchParams.get("search") ?? "",
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const currentSearch = prev.get("search") ?? "";
        if (inputValue) {
          next.set("search", inputValue);
        } else {
          next.delete("search");
        }
        // reset to page 1 only when search actually changes
        if (currentSearch !== inputValue) {
          next.delete("page");
        }
        return next;
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, setSearchParams]);

  return (
    <TableOperations>
      <div className="relative flex items-center">
        <HiMagnifyingGlass className="absolute left-4 text-grey-400 w-[1.6rem] h-[1.6rem] pointer-events-none" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search by name, email or ID…"
          className="border border-grey-300 bg-grey-0 rounded-[5px] shadow-sm py-[0.8rem] pl-[3.2rem] pr-[1.2rem] w-[28rem] text-[1.4rem] placeholder:text-grey-400 focus:outline-none focus:ring-2 focus:ring-brand-600 focus:border-brand-600 transition-shadow"
        />
      </div>
    </TableOperations>
  );
}
