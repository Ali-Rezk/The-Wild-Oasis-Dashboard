import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

export default function CabinTable() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  console.log(cabins);
  if (isLoading) return <Spinner />;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <table className="border border-grey-200 text-[1.4rem] bg-grey-0 rounded-[7px] overflow-hidden">
      <thead className="grid grid-cols-[0.6fr_1.8fr_2.2fr_1fr_1fr_1fr] gap-x-[2.4rem] items-center bg-grey-50 border-b border-grey-100 uppercase tracking-[0.4px] font-semibold text-grey-600 px-[2.4rem] py-[1.6rem]">
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </thead>
      <tbody>
        {cabins.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </tbody>
    </table>
  );
}
