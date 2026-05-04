function Heading({ as = "h1", children }) {
  const Tag = as;

  const classes = {
    h1: "text-[2rem] sm:text-[3rem] font-semibold leading-[1.4]",
    h2: "text-[1.6rem] sm:text-[2rem] font-semibold leading-[1.4]",
    h3: "text-[1.6rem] sm:text-[2rem] font-medium leading-[1.4]",
    h4: "text-[2rem] sm:text-[3rem] font-semibold leading-[1.4]",
  };

  return <Tag className={classes[as]}>{children}</Tag>;
}

export default Heading;
