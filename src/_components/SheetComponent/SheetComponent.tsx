import { LogIn, Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { getUser } from "@/lib/authToken";
import Link from "next/link";
import CardComponent from "../CardComponent/CardComponent";

const SheetComponent = async () => {
  const user = await getUser();

  if (!user) return null;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl sm:text-3xl font-bold">
            Lanch<span className="text-brand-primary">App</span>
          </SheetTitle>

          <div className="w-full rounded-md border border-solid border-app-border p-2 my-2">
            {user ? (
              <h2 className="text-sm font-bold">
                Seja bem-vindo: <span className="font-normal">{user.name}</span>
              </h2>
            ) : (
              <div className="flex">
                <Link href="/login">
                  <Button>Faça login</Button>
                </Link>
                <LogIn size={22} />
              </div>
            )}
          </div>

          <CardComponent />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
