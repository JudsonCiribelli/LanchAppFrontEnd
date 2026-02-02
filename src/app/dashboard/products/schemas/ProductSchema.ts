import z from "zod";

export const ProductFormSchema = z.object({
  name: z.string().nonempty({ message: "O nome do produto é obrigatório" }),
  price: z.string().min(1).nonempty({ message: "O preço é obrigatório" }),
  description: z.string().nonempty({ message: "A descrição é obrigatória" }),
  banner: z
    .any()
    .refine((file) => file instanceof File, "A imagem é obrigatória")
    .refine((file) => file?.size <= 5000000, "O tamanho máximo é 5MB"),
  categoryId: z.string().nonempty({ message: "A categoria é obrigatória" }),
});

export type ProductSchemaType = z.infer<typeof ProductFormSchema>;
