"use client";
import { Badge } from "@/_components/ui/badge";
import { Button } from "@/_components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/_components/ui/card";
import { parseCurrencyToNumber } from "@/_helpers/formatCurrency";
import { apiClient } from "@/lib/api";
import { statusConfig } from "@/lib/order-status";
import { typeConfig } from "@/lib/order-type";
import { OrderTypes } from "@/types/order";
import { Eye, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import OrderModalComponent from "../OrderModalComponent/OrderModalComponent";

interface OrderContentProps {
  token: string;
}

const OrdersContent = ({ token }: OrderContentProps) => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [selectOrder, setSelectOrder] = useState<null | string>(null);

  const getOrders = async () => {
    try {
      const response = await apiClient<OrderTypes[]>("/orders/status", {
        method: "GET",
        cache: "no-store",
        token: token,
      });

      const pendingOrders = response.filter(
        (order) => order.status === "PENDING",
      );

      setOrders(pendingOrders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    async function loadingOrders() {
      getOrders();
    }
    loadingOrders();
  }, []);

  return (
    <div className="space-y-5 xl:p-4">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Pedidos</h1>
          <h1 className="text-xl font-normal text-muted-foreground">
            Gerencie os pedidos da cozinha.
          </h1>
        </div>
        <Button
          onClick={getOrders}
          className="cursor-pointer bg-brand-primary text-white hover:bg-brand-primary"
        >
          <RefreshCcw size={22} />
        </Button>
      </div>

      {loading ? (
        <div>
          <h1 className="text-center text-gray-500">Carregando pedidos...</h1>
        </div>
      ) : orders.length === 0 ? (
        <div>
          <h1 className="text-center text-red-500">Nenhum pedido encontrado</h1>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => {
            const config =
              statusConfig[order.status as keyof typeof statusConfig];
            const type = typeConfig[order.type as keyof typeof typeConfig];
            const total = order!.items!.reduce((sum, item) => {
              return (
                sum + parseCurrencyToNumber(item.product.price) * item.amount
              );
            }, 0);
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle
                      className={`px-2 py-1 rounded text-white text-sm ${type.color}`}
                    >
                      {type.label}
                      {order.table !== 0 ? ` - ${order.table}` : ""}
                    </CardTitle>
                    <Badge
                      className={`text-sm px-2 py-1 rounded text-white select-none ${config.color}`}
                    >
                      {config.label}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4 mt-auto">
                  <div>
                    {order.items && order.items.length > 0 && (
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item) => (
                          <div className="flex flex-col gap-6">
                            <div className="flex flex-col">
                              <p
                                key={item.id}
                                className="text-xs text-muted-foreground truncate sm:text-sm"
                              >
                                {item.amount}x {item.product.name} -{" "}
                                {item.product.price}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="flex flex-col gap-2 justify-between border-t border-app-border pt-4 xl:flex-row">
                          <div className="flex flex-col gap-1">
                            <p>Total</p>
                            <p className="text-brand-primary font-bold">
                              {total.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          </div>
                          <Button
                            onClick={() => setSelectOrder(order.id)}
                            className="bg-brand-primary w-full text-white cursor-pointer hover:bg-brand-primary xl:w-auto"
                          >
                            <Eye size={22} />
                            Detalhes
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <OrderModalComponent
        orderId={selectOrder!}
        onClose={async () => {
          setSelectOrder(null);
          await getOrders();
        }}
        token={token}
      />
    </div>
  );
};

export default OrdersContent;
