import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

function Login() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-grey-50 px-4 py-12">
      <div className="flex flex-col items-center gap-10 w-full max-w-176">
        <Logo />
        <div className="flex flex-col gap-6 w-full">
          <div className="text-center">
            <Heading as="h4">Log in to your account</Heading>
          </div>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

export default Login;
