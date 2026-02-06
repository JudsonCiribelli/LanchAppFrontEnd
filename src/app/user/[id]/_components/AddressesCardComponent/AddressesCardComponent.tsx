"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/_components/ui/button";
import { UserTypes } from "@/types/user";
import { House, MapPin, Pencil, Trash } from "lucide-react";
import AddressesFormComponent from "../AddressesFormComponent/AddressesFormComponent";
import { DeleteUserAddress } from "../../actions/user";
import { Separator } from "@/_components/ui/separator";

interface AddressesCardProps {
  user: UserTypes;
}

const AddressesCardComponent = ({ user }: AddressesCardProps) => {
  const [isDeleting, startTransition] = useTransition();

  const router = useRouter();

  const handleDeleteAddress = (id: String) => {
    startTransition(async () => {
      await DeleteUserAddress(id);

      router.refresh();
    });
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

                  <Button
                    variant="ghost"
                    className="flex items-center gap-1 text-blue-400 text-sm cursor-pointer hover:underline"
                  >
                    <Pencil size={18} />
                    Editar
                  </Button>
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
