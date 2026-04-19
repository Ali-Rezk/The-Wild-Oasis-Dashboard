const sizeClasses = {
  small: "text-[1.2rem] uppercase font-semibold text-center",
  medium: "text-[1.4rem] font-medium",
  large: "text-[1.6rem] font-medium",
};

const sizePadding = {
  small: "0.4rem 0.8rem",
  medium: "1.2rem 1.6rem",
  large: "1.2rem 2.4rem",
};

const variationClasses = {
  primary: "text-brand-50 bg-brand-600 hover:bg-brand-700",
  secondary: "text-grey-600 bg-grey-0 border border-grey-200 hover:bg-grey-50",
  danger: "text-red-100 bg-red-700 hover:bg-red-800",
};

function Button({
  children,
  size = "medium",
  variation = "primary",
  onClick,
  disabled,
  type,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border-none rounded-[5px] shadow-sm transition-colors ${sizeClasses[size]} ${variationClasses[variation]}`}
      style={{ padding: sizePadding[size] }}
    >
      {children}
    </button>
  );
}

export default Button;
