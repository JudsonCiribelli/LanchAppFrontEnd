import { redirect } from "next/navigation";
import FormSignUp from "./_components/FormSignUp/FormSignUp";
import { getUser } from "@/lib/authToken";

const SignUpPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-app-background flex items-center justify-center px-4">
      <div className="w-full">
        <FormSignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
