"use client";

import { useState } from "react";
import { UserTypes } from "@/types/user";
import Link from "next/link";
import { Button } from "../ui/button";
import CardComponent from "../CardComponent/CardComponent";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LogIn, Menu } from "lucide-react";

interface SheetsProps {
  user: UserTypes;
}

const SheetComponent = ({ user }: SheetsProps) => {
  const [isSheetsOpen, setIsSheetsOpen] = useState(false);

  return (
    <Sheet open={isSheetsOpen} onOpenChange={setIsSheetsOpen}>
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

          <CardComponent userId={user.id} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SheetComponent;
