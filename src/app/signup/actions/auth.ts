"use server";

import { z } from "zod";
import { SignUpSchema } from "../schemas/schema";
import { apiClient } from "@/lib/api";

export type FormState = {
  success: boolean;
  message: string | null;
  redirectTo?: string;
  errors?: {
    [K in keyof z.infer<typeof SignUpSchema>]?: string[];
  };
};

export async function signUpAction(
  prevState: any,
  formData: FormData,
): Promise<FormState> {
  const rawData = Object.fromEntries(formData);
  const validatedFields = SignUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro na validação dos campos",
    };
  }

  try {
    const data = {
      name: validatedFields.data.name,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      phone: validatedFields.data.phone,
    };

    await apiClient("/user", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return {
      success: true,
      message: "Conta criada com sucesso!",
      redirectTo: "/login",
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
