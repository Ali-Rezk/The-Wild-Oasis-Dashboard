function Spinner() {
  return (
    <div
      className="animate-spin rounded-full"
      style={{
        margin: "4.8rem auto",
        width: "6.4rem",
        aspectRatio: "1",
        background:
          "radial-gradient(farthest-side, var(--color-brand-600) 94%, #0000) top/10px 10px no-repeat, conic-gradient(#0000 30%, var(--color-brand-600))",
        WebkitMask:
          "radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0)",
        animationDuration: "1.5s",
        animationTimingFunction: "linear",
      }}
    />
  );
}

export default Spinner;
