"use client";
import { useActionState, useEffect, useState } from "react";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import { AddressesFormSchema, AddressesFormType } from "../../schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/_components/ui/input";
import { AddressesRegisterAction } from "../../actions/auth";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const AddressesFormComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const form = useForm<AddressesFormType>({
    resolver: zodResolver(AddressesFormSchema),
    defaultValues: {
      street: "",
      number: "",
      city: "",
      complement: "",
      state: "",
      neighborhood: "",
      zipCode: "",
    },
  });

  const [state, action, isPending] = useActionState(AddressesRegisterAction, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (state.success) {
      form.reset();
      setIsOpen(false);
    }
  }, [state, form, router]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="text-sm flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
          <Plus size={16} /> Novo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25 lg:max-w-150 xl:max-w-200">
        <DialogHeader>
          <DialogTitle>Cadastre um novo endereço</DialogTitle>
        </DialogHeader>
        {/* Criar o formulario de cadastro em relaçao ao endereço do usuario */}
        <Form {...form}>
          <form className="space-y-3" action={action}>
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome da rua"
                      type="street"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input placeholder="Número da casa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Complemento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input placeholder="EX: MA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input placeholder="EX: 65074-000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button
              type="submit"
              className="mx-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressesFormComponent;
