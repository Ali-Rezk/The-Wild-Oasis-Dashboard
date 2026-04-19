import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 10;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[1.4rem]" style={{ marginLeft: "0.8rem" }}>
        Showing <span className="font-semibold">{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span className="font-semibold">{currentPage === pageCount ? count : currentPage * PAGE_SIZE}</span> of{" "}
        <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-[0.6rem]">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center gap-[0.4rem] border-none rounded-[5px] font-medium text-[1.4rem] bg-grey-50 transition-all duration-300 hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 disabled:opacity-50"
          style={{ padding: "0.6rem 1.2rem" }}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="flex items-center justify-center gap-[0.4rem] border-none rounded-[5px] font-medium text-[1.4rem] bg-grey-50 transition-all duration-300 hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 disabled:opacity-50"
          style={{ padding: "0.6rem 1.2rem" }}
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
