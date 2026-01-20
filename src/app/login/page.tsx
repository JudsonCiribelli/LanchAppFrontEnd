import LoginForm from "./_components/FormLogin/FormLogin";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-app-background flex items-center justify-center px-4">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
