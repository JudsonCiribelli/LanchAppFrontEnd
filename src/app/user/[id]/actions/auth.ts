"use server";
import z from "zod";
import { AddressesFormSchema } from "../schemas/schema";
import { apiClient } from "@/lib/api";
import { RegisterAddresses } from "../types/RegisterAddresses";
import { getToken } from "@/lib/authToken";

export type FormState = {
  success: boolean;
  message: string | null;
  redirectTo?: string;
  errors?: {
    [K in keyof z.infer<typeof AddressesFormSchema>]?: string[];
  };
};

export async function AddressesRegisterAction(
  prevState: any,
  formData: FormData,
) {
  const rawData = Object.fromEntries(formData);
  const validatedFields = AddressesFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro na validação dos campos",
    };
  }

  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "Você precisa estar logado." };
    }
    const data = {
      street: validatedFields.data.street,
      number: validatedFields.data.number,
      complement: validatedFields.data.complement,
      neighborhood: validatedFields.data.neighborhood,
      state: validatedFields.data.state,
      city: validatedFields.data.city,
      zipCode: validatedFields.data.zipCode,
    };

    await apiClient<RegisterAddresses>("/user/address", {
      method: "POST",
      body: JSON.stringify(data),
      token: token,
    });

    return {
      success: true,
      message: "Endereço cadastrado com sucesso!",
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
