"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logOutAction } from "../../actions/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/_components/ui/button";
import { Separator } from "@/_components/ui/separator";
import {
  Grid2x2,
  LogOut,
  ShoppingBasket,
  ShoppingCart,
  User,
} from "lucide-react";

interface SideBarProps {
  userName: string;
  userId: string;
}

const menuItems = [
  {
    title: "Pedidos",
    href: "/dashboard/orders",
    icon: ShoppingBasket,
  },
  {
    title: "Produtos",
    href: "/dashboard/products",
    icon: ShoppingCart,
  },
  {
    title: "Categorias",
    href: "/dashboard/categories",
    icon: Grid2x2,
  },
];

const SideBarComponent = ({ userName, userId }: SideBarProps) => {
  const pathName = usePathname();

  return (
    <aside className="hidden lg:block h-screen w-76 border-r border-app-border bg-app-sidebar">
      <div className="p-6">
        <Button asChild variant="secondary">
          <Link href="/dashboard">
            <h1 className="font-bold text-2xl">
              Lanch<span className="text-brand-primary">App</span>
            </h1>
          </Link>
        </Button>
        <p className="font-normal text-white text-xs mt-1.5">Olá, {userName}</p>
      </div>
      <Separator />

      <nav className="flex-1 p-4 space-y-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathName === item.href;
          return (
            <Link
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white font-medium",
                isActive ? "bg-brand-primary text-white" : "hover:bg-gray-400",
              )}
              key={item.title}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
        <Button
          asChild
          className="w-full justify-start gap-3 text-white cursor-pointer bg-brand-primary hover:bg-brand-primary"
        >
          <Link href={`/user/${userId}`}>
            <User size={22} />
            Ver perfil
          </Link>
        </Button>
      </nav>

      <div className="border-t border-app-border p-4 mt-140">
        <form action={logOutAction}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-white hover:text-black cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Button>
        </form>
      </div>
    </aside>
  );
};

export default SideBarComponent;
