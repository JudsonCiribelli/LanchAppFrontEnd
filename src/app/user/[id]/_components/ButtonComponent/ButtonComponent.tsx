"use client";
import { redirect } from "next/navigation";
import { Button } from "@/_components/ui/button";
import { ArrowLeft } from "lucide-react";

const ButtonComponent = () => {
  const handleRouterUser = () => {
    redirect("/dashboard");
  };

  return (
    <Button
      className="bg-white text-black cursor-pointer hover:bg-white"
      onClick={handleRouterUser}
    >
      <ArrowLeft size={22} />
    </Button>
  );
};

export default ButtonComponent;
