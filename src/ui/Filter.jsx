import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0].value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.has("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <div className="border border-grey-100 bg-grey-0 shadow-sm rounded-[5px] flex gap-[0.4rem] p-[0.4rem]">
      {options.map((option) => {
        const isActive = currentFilter === option.value;
        return (
          <button
            key={option.value}
            onClick={() => handleClick(option.value)}
            disabled={isActive}
            className={`border-none rounded-[5px] font-medium text-[1.4rem] transition-all duration-300 py-[0.44rem] px-[0.8rem] hover:not-disabled:bg-brand-600 hover:not-disabled:text-brand-50 ${
              isActive ? "bg-brand-600 text-brand-50" : "bg-grey-0"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default Filter;
