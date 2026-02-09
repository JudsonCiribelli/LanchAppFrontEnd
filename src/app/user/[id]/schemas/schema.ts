import z from "zod";

export const AddressesFormSchema = z.object({
  street: z.string().nonempty({ message: "Campo obrigatorio!" }),
  number: z.string(),
  complement: z.string().nonempty({ message: "Campo obrigatorio!" }),
  neighborhood: z.string().nonempty({ message: "Campo obrigatorio!" }),
  city: z.string().nonempty({ message: "Campo obrigatorio!" }),
  state: z.string().nonempty({ message: "Campo obrigatorio!" }),
  zipCode: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 8, {
      message: "Campo obrigatorio!",
    }),
});

export type AddressesFormType = z.infer<typeof AddressesFormSchema>;

export const UpdatedAddressesSchema = z.object({
  newStreet: z.string().nonempty({ message: "Campo obrigatorio!" }),
  newNumber: z.string(),
  newComplement: z.string().nonempty({ message: "Campo obrigatorio!" }),
  newNeighborhood: z.string().nonempty({ message: "Campo obrigatorio!" }),
  newCity: z.string().nonempty({ message: "Campo obrigatorio!" }),
  newState: z.string().nonempty({ message: "Campo obrigatorio!" }),
  newZipCode: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 8, {
      message: "Campo obrigatorio!",
    }),
});

export type UpdatedAddressesType = z.infer<typeof UpdatedAddressesSchema>;

export const UpdateProfileSchema = z.object({
  newEmail: z.email().nonempty({ message: "Email é obrigatório" }),
  newName: z.string().nonempty({ message: "Nome é obrigatório" }),
  newPhone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, {
      message: "O número de telefone deve ter 11 dígitos. (DDD + 9xxxx-xxxx).",
    })
    .refine((val) => /^[1-9]{2}9[0-9]{8}$/.test(val), {
      message: "Número de telefone inválido.",
    }),
});

export type UpdateSchemaType = z.infer<typeof UpdateProfileSchema>;
