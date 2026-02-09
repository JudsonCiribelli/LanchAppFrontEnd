"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/_components/ui/button";
import { useForm } from "react-hook-form";
import { UserTypes } from "@/types/user";
import { House, Loader2, MapPin, Pencil, Trash } from "lucide-react";
import AddressesFormComponent from "../AddressesFormComponent/AddressesFormComponent";
import { DeleteUserAddress, UpdatedAddressAction } from "../../actions/user";
import { Separator } from "@/_components/ui/separator";
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
import {
  UpdatedAddressesSchema,
  UpdatedAddressesType,
} from "../../schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/_components/ui/input";

interface AddressesCardProps {
  user: UserTypes;
}

const AddressesCardComponent = ({ user }: AddressesCardProps) => {
  const [isDeleting, startTransition] = useTransition();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<UpdatedAddressesType>({
    resolver: zodResolver(UpdatedAddressesSchema),
    defaultValues: {
      newStreet: "",
      newNumber: "",
      newComplement: "",
      newNeighborhood: "",
      newCity: "",
      newState: "",
      newZipCode: "",
    },
  });

  const handleDeleteAddress = (id: String) => {
    startTransition(async () => {
      await DeleteUserAddress(id);

      router.refresh();
    });
  };

  const handleEditAddress = (addr: any) => {
    setSelectedAddressId(addr.id);

    form.reset({
      newStreet: addr.street,
      newNumber: addr.number,
      newComplement: addr.complement,
      newNeighborhood: addr.neighborhood,
      newCity: addr.city,
      newState: addr.state,
      newZipCode: addr.zipCode,
    });

    setIsOpen(true);
  };

  const handleSubmit = async (data: UpdatedAddressesType) => {
    if (!selectedAddressId) return;

    const result = await UpdatedAddressAction(selectedAddressId, data);

    if (result.success) {
      setIsOpen(false);
      setSelectedAddressId(null);
      form.reset();
      router.refresh();
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="col-span-1 md:col-span-2 space-y-6">
      <section className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <MapPin className="text-blue-500" /> Meus Endereços
          </h3>
          <AddressesFormComponent />
        </div>
        <div className="mb-4">
          <Separator />
        </div>

        <div className="space-y-4">
          {user.addresses.map((addr) => (
            <div
              key={user.id}
              className="group relative bg-slate-950/50 hover:bg-slate-800/50 p-5 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <House size={18} />
                    <span className="font-semibold text-white text-lg">
                      Casa
                    </span>
                  </div>
                  <p className="text-slate-400">
                    {addr.street}, {addr.neighborhood}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {addr.city} - CEP: {addr.zipCode}
                  </p>
                </div>

                <div className="flex flex-col  items-center gap-2 text-blue-400">
                  <Button
                    onClick={() => handleDeleteAddress(addr.id)}
                    variant="ghost"
                    className="flex items-center gap-1 text-red-400 text-sm cursor-pointer hover:underline"
                  >
                    <Trash size={18} />
                    Deletar
                  </Button>

                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => handleEditAddress(addr)}
                        variant="ghost"
                        className="flex items-center gap-1 text-blue-400 text-sm cursor-pointer hover:underline"
                      >
                        <Pencil size={18} />
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-106.25 lg:max-w-150 xl:max-w-200">
                      <DialogHeader>
                        <DialogTitle>Atualize seu endereço</DialogTitle>
                      </DialogHeader>

                      {/* Formulario para atualizar endereço */}
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(handleSubmit)}
                          className="space-y-3"
                        >
                          <FormField
                            control={form.control}
                            name="newStreet"
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
                            name="newNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Número</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Número da casa"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="newComplement"
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
                            name="newNeighborhood"
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
                            name="newCity"
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
                            name="newState"
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
                            name="newZipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="EX: 65074-000"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <DialogClose asChild>
                            <Button
                              variant="outline"
                              onClick={() => setIsOpen(false)}
                            >
                              Cancelar
                            </Button>
                          </DialogClose>
                          <Button
                            type="submit"
                            className="mx-4"
                            disabled={form.formState.isSubmitting}
                          >
                            {form.formState.isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Atualizando...
                              </>
                            ) : (
                              "Atualizar"
                            )}
                          </Button>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AddressesCardComponent;
