import CheckoutButton from "features/check-in-out/CheckoutButton";
import { Link } from "react-router-dom";
import Button from "ui/Button";
import { Flag } from "ui/Flag";
import Tag from "ui/Tag";

function TodayItem({ stay }) {
  const { id, status, guests, numNights } = stay;

  const statusToAction = {
    unconfirmed: {
      action: "arriving",
      tag: "green",
      button: (
        <Button variation="primary" size="small" as={Link} to={`/checkin/${id}`}>
          Check in
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
    <li
      className="grid items-center border-b border-grey-100 first:border-t first:border-grey-100"
      style={{
        gridTemplateColumns: "9rem 2rem 1fr 7rem 9rem",
        gap: "1.2rem",
        fontSize: "1.4rem",
        padding: "0.8rem 0",
      }}
    >
      <Tag type={statusToAction[status].tag}>
        {statusToAction[status].action}
      </Tag>
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <div className="font-medium">{guests.fullName}</div>
      <div>{numNights} nights</div>
      {statusToAction[status].button}
    </li>
  );
}

export default TodayItem;
