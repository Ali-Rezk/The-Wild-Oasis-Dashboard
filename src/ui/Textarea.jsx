export default function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="border border-grey-300 rounded-[5px] bg-grey-0 shadow-sm py-[0.8rem] px-[1.2rem] min-h-[8rem] w-full min-w-[20rem]"
    />
  );
}
