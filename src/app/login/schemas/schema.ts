import z from "zod";

export const LoginSchema = z.object({
  email: z.email().nonempty({ message: "Email é obrigatório" }),
  password: z.string().nonempty({ message: "Senha é obrigatória" }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
