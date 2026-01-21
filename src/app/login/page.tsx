import { getUser } from "@/lib/authToken";
import LoginForm from "./_components/FormLogin/FormLogin";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-app-background flex items-center justify-center px-4">
      <div className="w-full">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
