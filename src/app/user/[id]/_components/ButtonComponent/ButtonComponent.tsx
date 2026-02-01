"use client";

import { Button } from "@/_components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const ButtonComponent = () => {
  const router = useRouter();

  const handleRedirectUser = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleRedirectUser}
      className="cursor-pointer bg-white text-black hover:bg-white"
    >
      <MoveLeft size={22} />
    </Button>
  );
};

export default ButtonComponent;
