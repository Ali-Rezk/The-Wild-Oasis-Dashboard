import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function Sort({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      onChange={handleChange}
      value={currentSort}
    ></Select>
  );
}
