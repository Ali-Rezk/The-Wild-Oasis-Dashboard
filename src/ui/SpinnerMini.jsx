import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini() {
  return (
    <BiLoaderAlt
      className="animate-spin"
      style={{
        width: "2.4rem",
        height: "2.4rem",
        animationDuration: "1.5s",
        animationTimingFunction: "linear",
      }}
    />
  );
}

export default SpinnerMini;
