import Spinner from "../../ui/Spinner";
import { useGetCabins } from "../cabins/cabinHooks";
import Stats from "./Stats";
import { useRecentBookings, useRecentStays } from "./useDashboardBookings";

function DashboardLayout() {
  const { bookings, isLoading: isLoadingBookings } = useRecentBookings();
  const { stays, isLoading: isLoadingStays, numDays } = useRecentStays();
  const { data: cabins, isLoading: isLoadingCabins } = useGetCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
    return <Spinner />;
  }

  return (
    <div
      className="grid grid-cols-4 gap-[2.4rem]"
      style={{
        gridTemplateRows: "auto 34rem auto",
      }}
    >
      <Stats
        bookings={bookings}
        confirmedStays={stays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </div>
  );
}

export default DashboardLayout;
