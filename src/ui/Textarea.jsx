export default function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="border border-grey-300 rounded-[5px] bg-grey-0 shadow-sm w-full"
      style={{ padding: "0.8rem 1.2rem", height: "8rem" }}
    />
  );
}
