import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import TodayItem from "../dashboard/TodayItem";
import { useActivityTodayStays } from "./useCheckin-out";

function TodayActivity() {
  const { isLoading, stays } = useActivityTodayStays();

  return (
    <div className="bg-grey-0 border border-grey-100 rounded-[7px] flex flex-col gap-[2.4rem] p-[3.2rem] pt-[2.4rem] sm:col-span-2 lg:col-span-2 lg:row-start-2">
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        stays?.length > 0 ? (
          <ul className="overflow-y-auto lg:overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {stays.map((stay) => (
              <TodayItem key={stay.id} stay={stay} />
            ))}
          </ul>
        ) : (
          <p className="text-center font-medium text-[1.6rem] mt-[1.6rem]">
            No activity today...
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;
