import { formatDate } from "@/_helpers/formatDate";
import { statusConfig } from "@/lib/order-status";
import { OrderTypes } from "@/types/order";
import { Package } from "lucide-react";

interface OrderCardProps {
  orders: OrderTypes[];
}

const OrdersCardComponent = ({ orders }: OrderCardProps) => {
  const config = orders
    ? statusConfig[orders[0].status as keyof typeof statusConfig]
    : undefined;

  return (
    <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg ">
      <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
        <Package className="text-blue-500" /> Últimos Pedidos
      </h3>

      <div className="overflow-hidden rounded-xl border border-slate-800">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-950 text-slate-200 uppercase font-semibold text-xs">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Data</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 bg-slate-900">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-white">{order.id}</td>
                <td className="px-4 py-3">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === "FINISHED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                    }`}
                  >
                    {config!.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button className="text-slate-300 hover:text-white">
                    Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersCardComponent;
