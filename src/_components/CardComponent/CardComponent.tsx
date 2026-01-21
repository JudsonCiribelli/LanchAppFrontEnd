import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Grid2x2, ShoppingBasket, ShoppingCart } from "lucide-react";

const CardComponent = () => {
  return (
    <Card className="border-app-border">
      <CardHeader>
        <CardTitle>Navegue entre as páginas</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3 ">
        <Button className="flex items-start justify-start bg-brand-primary">
          <ShoppingCart size={24} />
          <p className="text-sm font-bold">Pedidos</p>
        </Button>
        <Button className="flex items-start justify-start bg-brand-primary">
          <ShoppingBasket size={24} />
          <p className="text-sm font-bold">Produtos</p>
        </Button>

        <Button className="flex items-start justify-start bg-brand-primary">
          <Grid2x2 size={24} />
          <p className="text-sm font-bold">Pedidos</p>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
