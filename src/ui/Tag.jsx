function Tag({ type, children }) {
  return (
    <span
      className="w-fit uppercase font-semibold rounded-full"
      style={{
        fontSize: "1.1rem",
        padding: "0.4rem 1.2rem",
        color: `var(--color-${type}-700)`,
        backgroundColor: `var(--color-${type}-100)`,
      }}
    >
      {children}
    </span>
  );
}

export default Tag;
