import { getToken } from "@/lib/authToken";
import OrdersContent from "./_components/OrdersContentComponent/OrdersContentComponent";

export default async function OrdersPage() {
  const token = await getToken();

  if (!token) {
    return "Faça login para continuar";
  }
  return <OrdersContent token={token} />;
}
