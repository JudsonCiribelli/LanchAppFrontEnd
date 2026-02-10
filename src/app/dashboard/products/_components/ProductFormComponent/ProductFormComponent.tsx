"use client";
import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/_components/ui/dialog";
import { Button } from "@/_components/ui/button";
import { Plus, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { useForm } from "react-hook-form";
import {
  ProductFormSchema,
  ProductSchemaType,
} from "../../schemas/ProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProductAction } from "../../actions/products";
import { useRouter } from "next/navigation";
import { Input } from "@/_components/ui/input";
import { Textarea } from "@/_components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/_components/ui/select";
import { CategoryTypes } from "@/types/category";
import { formatToBrl } from "@/_helpers/formatCurrency";
import Image from "next/image";
import { toast } from "sonner";

interface ProductFormProps {
  categories: CategoryTypes[];
}

const ProductFormComponent = ({ categories }: ProductFormProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCategory, setSelectCategory] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(ProductFormSchema),
  });

  const onSubmit = async (data: ProductSchemaType) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", formatToBrl(data.price));
      formData.append("categoryId", data.categoryId);

      if (imageFile) {
        formData.append("file", imageFile);
      }

      const result = await createProductAction(formData);

      if (result.success) {
        setIsOpen(false);
        toast.success("Produto cadastrado com sucesso!");
        setSelectCategory("");
        setImagePreview(null);
        setImageFile(null);
        form.reset();
        router.refresh();
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      toast.message("Ocorreu um erro inesperado.");
    } finally {
      setIsLoading(false);
    }
  };

  const cleanCurrency = (value: string) => {
    return value.replace(/\D/g, "");
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: any[]) => void,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Imagem muito grande (máximo 5MB)");
        return;
      }

      onChange(file);

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearImage = (onChange: (...event: any[]) => void) => {
    setImagePreview(null);
    setImageFile(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-brand-primary cursor-pointer hover:bg-brand-primary">
          <Plus size={22} />
          Novo produto
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 lg:max-w-150 xl:max-w-200">
        <DialogHeader className="mb-4">
          <DialogTitle>Cadastre um novo produto</DialogTitle>
          <DialogDescription>Criando um novo produto</DialogDescription>
        </DialogHeader>

        {/* Criar o formulario de cadastro em relaçao ao novo produto */}
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do produto..."
                      type="name"
                      {...field}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="R$:35,00"
                      required
                      {...field}
                      onChange={(e) => {
                        const rawValue = cleanCurrency(e.target.value);
                        const formatted = formatToBrl(rawValue);

                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do produto</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Digite a descrição do produto..."
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectCategory(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                          className="text-black"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="banner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagem do produto</FormLabel>
                  <FormControl>
                    <div className="w-full">
                      {imagePreview ? (
                        <div className="relative w-full h-48 border rounded-md overflow-hidden">
                          <Image
                            src={imagePreview}
                            alt="preview"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            className="absolute cursor-pointer top-2 right-2 z-20"
                            onClick={() => handleClearImage(field.onChange)}
                          >
                            Excluir
                          </Button>
                        </div>
                      ) : (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-accent/50 transition"
                        >
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm font-medium">
                            Clique para selecionar uma imagem
                          </span>

                          <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={(e) =>
                              handleImageChange(e, field.onChange)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading || !form.formState.isValid}
              type="submit"
              className="bg-brand-primary w-full text-white hover:bg-brand-primary disabled:opacity-50"
            >
              {isLoading ? "Criando..." : "Criar produto"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormComponent;
