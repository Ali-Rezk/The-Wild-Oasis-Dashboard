import { useCurrentUser } from "./useAuth";
import image from "../../data/img/default-user.jpg";

function UserAvatar() {
  const { user } = useCurrentUser();
  const { full_name, avatar } = user?.user_metadata || {};
  console.log(user);

  return (
    <div className="flex gap-[1.2rem] items-center font-medium text-[1.4rem] text-grey-600">
      <img
        src={avatar || image}
        alt={`Avatar of ${full_name}`}
        className="block aspect-square object-cover object-center rounded-full outline outline-grey-100"
        style={{ width: "3.6rem" }}
      />
      <span>{full_name}</span>
    </div>
  );
}

export default UserAvatar;
