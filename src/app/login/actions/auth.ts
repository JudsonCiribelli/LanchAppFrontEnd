"use server";

import { apiClient } from "@/lib/api";
import { LoginSchema } from "../schemas/schema";
import { LoginUserType } from "../types/LoginUserType";
import { setToken } from "@/lib/authToken";

export async function loginAction(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  const validatedFields = LoginSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro na validação dos campos",
    };
  }

  try {
    const user = {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    };

    const response = await apiClient<LoginUserType>("/session", {
      method: "POST",
      body: JSON.stringify(user),
    });

    await setToken(response.token);

    return {
      success: true,
      message: "Login efetuado com sucesso!",
      redirectTo: "/dashboard",
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
      message: "Erro ao criar conta!",
    };
  }
}
