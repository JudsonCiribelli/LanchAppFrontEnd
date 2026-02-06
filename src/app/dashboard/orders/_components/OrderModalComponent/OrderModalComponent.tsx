import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/_components/ui/dialog";
import { parseCurrencyToNumber } from "@/_helpers/formatCurrency";
import { apiClient } from "@/lib/api";
import { statusConfig } from "@/lib/order-status";
import { typeConfig } from "@/lib/order-type";
import { OrderTypes } from "@/types/order";
import { FinishOrderAction } from "../../actions/orders";

interface OrderModalProps {
  orderId: string | null;
  onClose: () => Promise<void>;
  token: string;
}

const OrderModalComponent = ({ orderId, onClose, token }: OrderModalProps) => {
  const [order, setOrder] = useState<OrderTypes | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getOrders = async () => {
    if (!orderId) {
      setOrder(null);
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiClient<OrderTypes>(
        `/order/id?orderId=${orderId}`,
        {
          method: "GET",
          token: token,
        },
      );
      setOrder(response);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadingOrders() {
      getOrders();
    }
    loadingOrders();
  }, [orderId]);

  const handleFinishOrder = async () => {
    if (!orderId) {
      return;
    }

    const result = await FinishOrderAction(orderId);

    if (!result.success) {
      console.log(result.error);
    }

    if (result.success) {
      onClose();
      router.refresh();
    }
  };

  const type = order
    ? typeConfig[order.type as keyof typeof typeConfig]
    : undefined;
  const config = order
    ? statusConfig[order.status as keyof typeof statusConfig]
    : undefined;

  const calculateTotal = () => {
    if (!order?.items) return 0;
    return order.items.reduce((total, item) => {
      return total + parseCurrencyToNumber(item.product.price) * item.amount;
    }, 0);
  };

  return (
    <Dialog open={orderId !== null} onOpenChange={() => onClose()}>
      <DialogContent className="p-6 bg-app-card text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Detalhes do pedido
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        ) : order ? (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Nome da categoria
                </p>
                <Badge className={`text-lg font-semibold ${type!.color}`}>
                  {type!.label}
                  {order.table !== 0 ? ` - ${order.table}` : ""}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Cliente</p>
                <p className="text-lg font-semibold">
                  {order.name || "sem nome"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-1">Status</p>
                <Badge className={`text-lg font-semibold ${config!.color}`}>
                  {config!.label}
                </Badge>
              </div>
            </div>

            {/* ITEMS DO PEDIDO */}
            <div>
              <h3 className="text-lg font-semibold mb-1">Itens do pedido</h3>
              <div>
                {order.items && order.items.length > 0 ? (
                  order.items.map((item) => {
                    const subtotal =
                      parseCurrencyToNumber(item.product.price) * item.amount;
                    const total = order!.items!.reduce((sum, item) => {
                      return (
                        sum +
                        parseCurrencyToNumber(item.product.price) * item.amount
                      );
                    }, 0);
                    return (
                      <div
                        key={item.id}
                        className="bg-app-background rounded-lg p-4 border border-app-border mb-2"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-base mb-1">
                              {item.product.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.product.description}
                            </p>

                            <p className="text-sm text-muted-foreground mt-2">
                              {item.amount}x {item.product.name} -{" "}
                              {item.product.price}
                            </p>
                          </div>

                          <div className="text-right ml-4">
                            <p className="text-sm mb-1 text-muted-foreground">
                              Quantidade: {item.amount}
                            </p>

                            <p className="font-semibold text-lg">
                              Subtotal:{" "}
                              {subtotal.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-center py-4 text-muted-foreground">
                    Nenhum item no pedido!
                  </p>
                )}
              </div>
            </div>
            {/* Total */}
            <div className="border-t border-app-border pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-brand-primary">
                  {calculateTotal().toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>
        ) : null}

        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button
            onClick={() => onClose()}
            className="flex-1 bg-app-background cursor-pointer border-app-border text-white hover:bg-app-background"
          >
            Fechar
          </Button>

          <Button
            onClick={handleFinishOrder}
            className="flex-1 bg-brand-primary cursor-pointer hover:bg-brand-primary"
            disabled={isLoading}
          >
            Finalizar pedido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModalComponent;
