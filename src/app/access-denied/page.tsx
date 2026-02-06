import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { LogOut, ShieldX } from "lucide-react";
import { logOutAction } from "../dashboard/actions/auth";
import { getUser } from "@/lib/authToken";
import { redirect } from "next/navigation";

const AccessDeniedPage = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-app-background">
      <Card className="bg-app-card border-app-border text-white max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldX className="w-16 h-16 text-brand-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Acesso Negado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-muted-foreground text-center">
            Você não tem permissão para acessar o painel administrativo.
          </CardDescription>
          <p className="text-sm text-muted-foreground text-center">
            Se você acredita que isso é um erro, por favor, consulte o
            responsável pelo sistema.
          </p>

          <form action={logOutAction} className="flex justify-center pt-2">
            <Button
              className="flex items-center gap-2 cursor-pointer w-full"
              type="submit"
              variant="destructive"
            >
              <LogOut size={22} />
              Sair
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDeniedPage;
