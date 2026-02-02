"use server";

import { apiClient } from "@/lib/api";
import { getToken } from "@/lib/authToken";
import { CategoryTypes } from "@/types/category";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  try {
    const token = await getToken();

    const data = await apiClient<CategoryTypes[]>("/category", {
      method: "GET",
      token: token,
    });

    return data;
  } catch (error) {
    throw new Error("Error ao buscar categorias");
  }
}

export async function createCategoryAction(formData: FormData) {
  try {
    const token = await getToken();
    const categoryName = formData.get("categoryName");

    const data = { categoryName: categoryName };

    await apiClient<CategoryTypes>("/category", {
      method: "POST",
      body: JSON.stringify(data),
      token: token,
    });

    revalidatePath("/dashboard/categories");

    return { success: true, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
      return { success: false, error: error.message };
    }

    return { success: false, error: "Error ao criar categoria" };
  }
}
