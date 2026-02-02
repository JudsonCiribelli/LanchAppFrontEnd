"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/authToken";
import { revalidatePath } from "next/cache";
import { ProductsType } from "../types/products";

export async function getProductsAction() {
  try {
    const data = await apiClient<ProductsType[]>("/product", {
      method: "GET",
    });

    return data;
  } catch (error) {
    throw new Error("Error ao buscar produtos");
  }
}

export async function createProductAction(formData: FormData) {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, error: "Token não encontrado" };
    }

    await apiClient<ProductsType>("/product", {
      method: "POST",
      token: token,
      body: formData,
    });

    revalidatePath("/dashboard/products");

    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { success: false, error: error.message };
    }

    return { success: false, error: "Error ao criar produto" };
  }
}

export async function DeleteProductAction(productId: string) {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, error: "Token não encontrado" };
    }

    await apiClient("/product", {
      method: "DELETE",
      token: token,
      body: JSON.stringify({ productId }),
    });

    revalidatePath("/dashboard/products");
    return {
      success: true,
      message: "Produto deletado com sucesso!",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Erro ao deletar produto!",
    };
  }
}
