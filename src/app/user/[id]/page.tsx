"use server";
import { getToken, getUser } from "@/lib/authToken";
import { Button } from "@/_components/ui/button";
import { Bell, MoveLeft } from "lucide-react";
import ButtonComponent from "./_components/ButtonComponent/ButtonComponent";
import AddressesCardComponent from "./_components/AddressesCardComponent/AddressesCardComponent";
import { getInitials } from "@/_helpers/getInitials";
import OrdersCardComponent from "./_components/OrdersCardComponent/OrdersCardComponent";
import { OrderTypes } from "@/types/order";
import { apiClient } from "@/lib/api";
import UserCardComponent from "./_components/UserCardComponent/UserCardComponent";

const UserProfile = async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const token = await getToken();

  const orders = await apiClient<OrderTypes[]>("/user/orders", {
    method: "GET",
    cache: "no-store",
    token: token,
  });

  return (
    <div className="min-h-screen  bg-app-background text-slate-200 p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <ButtonComponent />
          <h1>Perfil do Usuário</h1>
        </div>
        <div className="flex items-center gap-2">
          <Bell size={24} />

          <Button className="w-13 h-13 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg border-4 border-slate-800 cursor-pointer hover:bg-blue-500">
            <p className="">{getInitials(user.name)}</p>
          </Button>
        </div>
      </header>
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <UserCardComponent user={user} />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-6">
          <AddressesCardComponent user={user} />
          {user.orders.length > 0 && <OrdersCardComponent orders={orders} />}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
