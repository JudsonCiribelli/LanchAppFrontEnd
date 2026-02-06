"use server";
import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/authToken";
import { revalidatePath } from "next/cache";

export async function FinishOrderAction(orderId: string) {
  if (!orderId) {
    return { success: false, error: "Falha ao finalizar pedido!" };
  }

  try {
    const token = await getToken();

    if (!token) {
      return {
        success: false,
        error: "Precisa de token para executar esta ação!",
      };
    }

    const data = {
      orderId: orderId,
    };

    await apiClient("/order/update", {
      method: "PUT",
      body: JSON.stringify(data),
      token: token,
    });
    revalidatePath("/dashboard");

    return { success: true, error: "Pedido finalizado com sucesso!" };
  } catch (error) {
    return { success: false, error: "Error ao finalizar pedido!" };
  }
}
