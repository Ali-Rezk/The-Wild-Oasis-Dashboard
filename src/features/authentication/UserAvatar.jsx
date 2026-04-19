function UserAvatar({ user }) {
  const { fullName, avatar } = user?.user_metadata || {};

  return (
    <div className="flex gap-[1.2rem] items-center font-medium text-[1.4rem] text-grey-600">
      <img
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
        className="block aspect-square object-cover object-center rounded-full outline outline-2 outline-grey-100"
        style={{ width: "3.6rem" }}
      />
      <span>{fullName}</span>
    </div>
  );
}

export default UserAvatar;
