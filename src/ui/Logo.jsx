import logoLight from "../data/img/logo-light.png";

function Logo() {
  return (
    <div className="text-center">
      <img
        src={logoLight}
        alt="Logo"
        style={{ height: "9.6rem", width: "auto" }}
      />
    </div>
  );
}

export default Logo;
