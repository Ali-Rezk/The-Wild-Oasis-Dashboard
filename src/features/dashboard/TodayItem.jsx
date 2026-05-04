import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import { Flag } from "../../ui/Flag";
import Tag from "../../ui/Tag";
import CheckoutButton from "../check-in-out/CheckoutButton";

function TodayItem({ stay }) {
  const { id, status, guests, numNights } = stay;

  const statusToAction = {
    unconfirmed: {
      action: "arriving",
      tag: "green",
      button: (
        <Button variation="primary" size="small">
          <Link to={`/checkin/${id}`}>Check in</Link>
        </Button>
      ),
    },
    "checked-in": {
      action: "departing",
      tag: "blue",
      button: <CheckoutButton bookingId={id} />,
    },
  };

  return (
    <li className="grid items-center border-b border-grey-100 first:border-t first:border-grey-100 gap-[1.2rem] text-[1.4rem] py-[0.8rem] grid-cols-[9rem_2rem_1fr_7rem_9rem]">
      <Tag type={statusToAction[status].tag}>
        {statusToAction[status].action}
      </Tag>
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.nationality}`} />
      <div className="font-medium">{guests.fullName}</div>
      <div>{numNights} nights</div>
      {statusToAction[status].button}
    </li>
  );
}

export default TodayItem;
