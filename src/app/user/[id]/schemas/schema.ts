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
