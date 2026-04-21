function FileInput({ props }) {
  return (
    <input
      type="file"
      {...props}
      className="text-[1.4rem] px-2 py-1 rounded-[5px] file:font-inherit file:font-medium file:mr-[1.2rem] file:rounded-[5px] file:border-none file:text-brand-50 file:bg-brand-600 file:cursor-pointer file:transition-colors file:hover:bg-brand-700 file:px-[1.2rem] file:py-[0.8rem]"
    />
  );
}

export default FileInput;
