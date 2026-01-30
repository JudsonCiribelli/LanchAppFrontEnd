"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CategorieFormSchema,
  CategorieSchemaType,
} from "../../schemas/CategorieSchema";
import { Input } from "@/_components/ui/input";
import { Button } from "@/_components/ui/button";
import { createCategoryAction } from "../../actions/categories";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CategoryFormComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const form = useForm<CategorieSchemaType>({
    resolver: zodResolver(CategorieFormSchema),
  });

  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const result = await createCategoryAction(formData);

    if (result.success) {
      form.reset();
      setIsOpen(false);
      router.refresh();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary cursor-pointer hover:bg-brand-primary">
          <Plus size={22} /> nova categoria
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 lg:max-w-150 xl:max-w-200">
        <DialogHeader className="mb-4">
          <DialogTitle>Cadastre uma nova categoria</DialogTitle>
          <DialogDescription>Criando nova categoria</DialogDescription>
        </DialogHeader>

        {/* Criar o formulario de cadastro em relaçao a nova categoria */}
        <Form {...form}>
          <form className="space-y-3" onSubmit={handleCreateCategory}>
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da categoria</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome da categoria"
                      type="categoryName"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-brand-primary cursor-pointer hover:bg-brand-primary"
            >
              Cadastrar categoria
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormComponent;
