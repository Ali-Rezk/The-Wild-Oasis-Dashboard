import Heading from "ui/Heading";
import Row from "ui/Row";
import Spinner from "ui/Spinner";
import TodayItem from "../dashboard/TodayItem";
import { useActivityTodayStays } from "./useActivityTodayStays";

function TodayActivity() {
  const { isLoading, stays } = useActivityTodayStays();

  return (
    <div
      className="bg-grey-0 border border-grey-100 rounded-[7px] flex flex-col gap-[2.4rem]"
      style={{ padding: "3.2rem", paddingTop: "2.4rem", gridColumn: "1 / span 2" }}
    >
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>

      {!isLoading ? (
        stays?.length > 0 ? (
          <ul className="overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {stays.map((stay) => (
              <TodayItem key={stay.id} stay={stay} />
            ))}
          </ul>
        ) : (
          <p className="text-center font-medium" style={{ fontSize: "1.8rem", marginTop: "0.8rem" }}>
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
