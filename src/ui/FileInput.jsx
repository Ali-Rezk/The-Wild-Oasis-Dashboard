function FileInput({ id, accept, disabled, onChange }) {
  return (
    <input
      type="file"
      id={id}
      accept={accept}
      disabled={disabled}
      onChange={onChange}
      className="text-[1.4rem] rounded-[5px] [&::file-selector-button]:font-inherit [&::file-selector-button]:font-medium [&::file-selector-button]:mr-[1.2rem] [&::file-selector-button]:rounded-[5px] [&::file-selector-button]:border-none [&::file-selector-button]:text-brand-50 [&::file-selector-button]:bg-brand-600 [&::file-selector-button]:cursor-pointer [&::file-selector-button]:transition-colors [&::file-selector-button]:hover:bg-brand-700"
      style={{ "--file-selector-button-padding": "0.8rem 1.2rem" }}
    />
  );
}

export default FileInput;
