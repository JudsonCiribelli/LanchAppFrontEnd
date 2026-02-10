"use client";
import { useState } from "react";
import { Button } from "@/_components/ui/button";
import {
  Dialog,
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
import { formatDate } from "@/_helpers/formatDate";
import { formatPhone } from "@/_helpers/formatPhone";
import { getInitials } from "@/_helpers/getInitials";
import { UserTypes } from "@/types/user";
import {
  Calendar,
  Edit3,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { UpdateProfileSchema, UpdateSchemaType } from "../../schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/_components/ui/input";
import { UpdateUserProfileAction } from "../../actions/user";
import { toast } from "sonner";

interface UserCardProps {
  user: UserTypes;
}

const UserCardComponent = ({ user }: UserCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<UpdateSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      newName: user.name,
      newEmail: user.email,
      newPhone: user.phone,
    },
  });

  const handleEditUser = async (data: UpdateSchemaType) => {
    setIsOpen(true);

    const result = await UpdateUserProfileAction(user.id, data);

    if (result.success) {
      setIsOpen(false);
      toast.success("Perfil atualizado com sucesso!");
      form.reset();
    } else {
      toast.error(result.message);
    }
  };

  const handleSubmit = async (data: UpdateSchemaType) => {};
  return (
    <section className="col-span-1 bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-xl flex flex-col items-center text-center h-fit">
      <div className="relative mb-6">
        <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg border-4 border-slate-800">
          {getInitials(user.name)}
        </div>
        <Button className="absolute bottom-0 right-0 bg-slate-700 hover:bg-slate-600 p-2 rounded-full border-4 border-slate-900 transition-colors">
          <Edit3 size={22} className="text-white" />
        </Button>
      </div>

      <h2 className="text-xl font-bold text-white mb-1">{user.name}</h2>
      {user.role === "ADMIN" && (
        <span className="bg-red-500/10 text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-500/20 mb-6 inline-flex items-center gap-1">
          <ShieldCheck size={12} /> ADMIN
        </span>
      )}

      {/* DADOS DO USUARIO */}
      <div className="w-full space-y-4 text-left bg-slate-950/50 p-5 rounded-xl border border-slate-800">
        {/* NAME*/}
        <div className="flex items-center gap-3 text-slate-400">
          <User size={18} className="text-blue-500" />
          <div className="overflow-hidden">
            <p className="text-sm text-slate-200 truncate" title={user.name}>
              {user.name}
            </p>
          </div>
        </div>
        {/* EMAIL */}
        <div className="flex items-center gap-3 text-slate-400">
          <Mail size={18} className="text-blue-500" />
          <div className="overflow-hidden">
            <p className="text-sm text-slate-200 truncate" title={user.email}>
              {user.email}
            </p>
          </div>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-3 text-slate-400">
          <Phone size={18} className="text-blue-500" />
          <div>
            <p className="text-sm text-slate-200">{formatPhone(user.phone)}</p>
          </div>
        </div>

        {/* MEMBRO */}
        <div className="flex items-center gap-3 text-slate-400">
          <Calendar size={18} className="text-blue-500" />
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">
              Membro Desde
            </p>
            <p className="text-sm text-slate-200">
              {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-blue-900/20">
            Editar Perfil
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar perfil de Usuário</DialogTitle>
          </DialogHeader>
          {/* FORMULÁRIO */}
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleEditUser)}
            >
              <FormField
                control={form.control}
                name="newEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder={user.name} type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder={user.email} type="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Celular</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={formatPhone(user.phone)}
                        type="tel"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatPhone(e.target.value);
                          field.onChange(formatted);
                        }}
                        maxLength={15}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={form.formState.isSubmitting}
                className="w-full bg-blue-600 cursor-pointer hover:bg-blue-600"
                type="submit"
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Salvar"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UserCardComponent;
