import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { ShieldX } from "lucide-react";

const AccessDeniedPage = () => {
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
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessDeniedPage;
