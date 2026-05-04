const colorMap = {
  blue: "text-blue-700 bg-blue-100",
  green: "text-green-700 bg-green-100",
  silver: "text-gray-700 bg-gray-200",
};

function Tag({ type, children }) {
  return (
    <span
      className={`w-fit uppercase font-semibold rounded-full text-[1.1rem] py-[0.4rem] px-[1.2rem] ${colorMap[type]}`}
    >
      {children}
    </span>
  );
}

export default Tag;
