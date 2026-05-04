import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

const MAX_VISIBLE = 5;

function getPageWindow(currentPage, pageCount) {
  if (pageCount <= MAX_VISIBLE) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const half = Math.floor(MAX_VISIBLE / 2);
  let start = currentPage - half;
  let end = currentPage + half;
  if (start < 1) {
    start = 1;
    end = MAX_VISIBLE;
  }
  if (end > pageCount) {
    end = pageCount;
    start = pageCount - MAX_VISIBLE + 1;
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function Pagination({ count, pageSize }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / pageSize);

  function goToPage(page) {
    searchParams.set("page", page);
    setSearchParams(searchParams);
  }

  function nextPage() {
    if (currentPage < pageCount) goToPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 1) goToPage(currentPage - 1);
  }

  if (pageCount <= 1) return null;

  const pages = getPageWindow(currentPage, pageCount);

  const btnBase =
    "flex items-center justify-center border-none rounded-[5px] font-medium text-[1.4rem] transition-all duration-300";
  const navBtn = `${btnBase} gap-[0.4rem] py-[0.6rem] px-[1.2rem] bg-grey-50 hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 disabled:opacity-50`;

  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-2">
      <p className="text-[1.4rem] ml-[0.8rem]">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === pageCount ? count : currentPage * pageSize}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-[0.6rem]">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={navBtn}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`${btnBase} ${
              page === currentPage
                ? "bg-brand-600 text-brand-50"
                : "bg-grey-50 hover:bg-brand-600 hover:text-brand-50"
            } py-[0.6rem] px-[1.2rem] min-w-[3.6rem]`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className={navBtn}
        >
          <span>Next</span>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
