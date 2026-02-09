"use server";
import z from "zod";
import {
  AddressesFormSchema,
  UpdatedAddressesType,
  UpdateSchemaType,
} from "../schemas/schema";
import { apiClient } from "@/lib/api";
import { RegisterAddresses } from "../types/RegisterAddresses";
import { getToken, getUser } from "@/lib/authToken";
import { revalidatePath } from "next/cache";

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
    const user = await getUser();
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
    revalidatePath(`/user/${user?.id}`);

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
      message: "Erro ao cadastrar endereço!",
    };
  }
}

export async function DeleteUserAddress(addressId: String) {
  try {
    const token = await getToken();
    const user = await getUser();

    if (!token) {
      return { success: false, message: "Você precisa estar logado." };
    }

    await apiClient("/user/address", {
      method: "DELETE",
      body: JSON.stringify({ addressId }),
      token: token,
    });

    revalidatePath(`/user/${user?.id}`);
    return {
      success: true,
      message: "Endereço deletado com sucesso!",
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
      message: "Erro ao deletar endereço!",
    };
  }
}

export async function UpdatedAddressAction(
  addressId: string,
  data: UpdatedAddressesType,
) {
  try {
    const token = await getToken();
    const user = await getUser();

    if (!token) {
      return { success: false, message: "Você precisa estar logado." };
    }

    await apiClient("/user/address", {
      method: "PUT",
      token: token,
      body: JSON.stringify({ addressId, ...data }),
    });

    revalidatePath(`/user/${user?.id}`);

    return {
      success: true,
      message: "Endereço atualizado com sucesso!",
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
      message: "Erro ao atualizar endereço!",
    };
  }
}

export async function UpdateUserProfileAction(
  userId: string,
  data: UpdateSchemaType,
) {
  try {
    const token = await getToken();
    const user = await getUser();

    if (!token) {
      return { success: false, message: "Você precisa estar logado." };
    }

    if (!user) {
      return { success: false, message: "Você precisa estar logado." };
    }

    await apiClient("/user/profile", {
      method: "PUT",
      token: token,
      body: JSON.stringify({ userId, ...data }),
    });

    revalidatePath(`/user/${user?.id}`);
    return { success: true, message: "Perfil atualizado com sucesso!" };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Erro ao atualizar endereço!",
    };
  }
}
