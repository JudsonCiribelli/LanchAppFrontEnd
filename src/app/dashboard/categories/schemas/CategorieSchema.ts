import z from "zod";

export const CategorieFormSchema = z.object({
  categoryName: z
    .string()
    .nonempty({ message: "O nome da categoria é obrigatório" }),
});

export type CategorieSchemaType = z.infer<typeof CategorieFormSchema>;
