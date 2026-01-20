import z from "zod";

export const SignUpSchema = z.object({
  name: z.string().nonempty({ message: "Nome é obrigatório" }),
  email: z.email().nonempty({ message: "Email é obrigatório" }),
  password: z.string().nonempty({ message: "Senha é obrigatória" }),
  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length === 11, {
      message: "O número de telefone deve ter 11 dígitos. (DDD + 9xxxx-xxxx).",
    })
    .refine((val) => /^[1-9]{2}9[0-9]{8}$/.test(val), {
      message: "Número de telefone inválido.",
    }),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
