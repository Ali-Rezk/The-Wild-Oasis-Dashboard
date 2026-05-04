import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini({ size = "w-10 h-10" }) {
  return (
    <BiLoaderAlt
      className={`animate-spin [animation-duration:1.5s] [animation-timing-function:linear] ${size} mx-auto`}
    />
  );
}

export default SpinnerMini;
