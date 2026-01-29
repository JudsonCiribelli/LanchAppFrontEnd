import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Grid2x2,
  LogOut,
  ShoppingBasket,
  ShoppingCart,
  User,
} from "lucide-react";
import { logOutAction } from "@/app/dashboard/actions/auth";

interface CardComponentProps {
  userId?: string;
}
const CardComponent = ({ userId }: CardComponentProps) => {
  return (
    <Card className="border-app-border">
      <CardHeader>
        <CardTitle>Navegue entre as páginas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3 ">
        <Button
          className="flex items-start justify-start bg-brand-primary"
          asChild
        >
          <Link href="/dashboard/orders">
            <ShoppingCart size={24} />
            <p className="text-sm font-bold">Pedidos</p>
          </Link>
        </Button>

        <Button
          className="flex items-start justify-start bg-brand-primary"
          asChild
        >
          <Link href="/dashboard/products">
            <ShoppingBasket size={24} />
            <p className="text-sm font-bold">Produtos</p>
          </Link>
        </Button>

        <Button
          className="flex items-start justify-start bg-brand-primary"
          asChild
        >
          <Link href="/dashboard/categories">
            <Grid2x2 size={24} />
            <p className="text-sm font-bold">Categorias</p>
          </Link>
        </Button>

        <Button
          className="flex items-start justify-start bg-brand-primary"
          asChild
        >
          <Link href={`/user/${userId}`}>
            <User size={24} />
            <p className="text-sm font-bold">Ver Perfil</p>
          </Link>
        </Button>

        <form action={logOutAction} className="mt-10">
          <Button
            type="submit"
            className="flex w-full items-start justify-start "
          >
            <LogOut className="w-5 h-5" />
            Sair
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
