export function Flag({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="max-w-8 rounded-[3px] block border border-grey-100"
    />
  );
}
