import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

function Login() {
  return (
    <main
      className="min-h-screen grid items-start justify-center bg-grey-50"
      style={{
        gridTemplateColumns: "48rem",
        alignContent: "center",
        gap: "3.2rem",
      }}
    >
      <Logo />
      <Heading as="h4">Log in to your account</Heading>
      <LoginForm />
    </main>
  );
}

export default Login;
