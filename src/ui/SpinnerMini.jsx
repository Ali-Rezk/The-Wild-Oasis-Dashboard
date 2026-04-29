import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ size = "w-10 h-10" }) {
  return (
    <BiLoaderAlt
      className={`animate-spin ${size} mx-auto`}
      style={{
        animationDuration: "1.5s",
        animationTimingFunction: "linear",
      }}
    />
  );
}

export default SpinnerMini;
