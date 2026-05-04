import Button from "./Button";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <main className="h-screen bg-grey-50 flex items-center justify-center p-4 sm:p-[4.8rem]">
      <div className="bg-grey-0 border border-grey-100 rounded-[7px] flex-[0_1_96rem] text-center p-8 sm:p-[4.8rem]">
        <h1 className="mb-[1.6rem]">Something went wrong 🙁</h1>
        <p className="font-[Sono] text-grey-500 mb-[3.2rem]">{error.message}</p>
        <Button onClick={resetErrorBoundary} size="large">
          Try again
        </Button>
      </div>
    </main>
  );
}

export default ErrorFallback;
