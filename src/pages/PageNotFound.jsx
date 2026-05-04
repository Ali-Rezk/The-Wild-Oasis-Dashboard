import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="h-screen bg-grey-50 flex items-center justify-center p-4 sm:p-[4.8rem]">
      <div className="bg-grey-0 border border-grey-100 rounded-[7px] flex-[0_1_96rem] text-center p-8 sm:p-[4.8rem]">
        <Heading as="h1">
          The page you are looking for could not be found
        </Heading>
        <button onClick={moveBack} className="text-[1.6rem] mt-[3.2rem]">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;
