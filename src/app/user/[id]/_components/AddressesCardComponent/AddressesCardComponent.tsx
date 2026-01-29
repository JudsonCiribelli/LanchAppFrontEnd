import { Button } from "@/_components/ui/button";
import { Card, CardContent } from "@/_components/ui/card";
import { Dialog, DialogTrigger } from "@/_components/ui/dialog";
import { UserTypes } from "@/types/user";
import { House } from "lucide-react";
import AddressesFormComponent from "../AddressesFormComponent/AddressesFormComponent";

interface AddressesCardProps {
  user: UserTypes;
}

const AddressesCardComponent = ({ user }: AddressesCardProps) => {
  return (
    <>
      <Card className="mx-2 mb-4">
        <CardContent className="flex flex-col space-y-1">
          <h1 className="mb-2 font-semibold text-xl">Cartão de ID</h1>
          <p className="text-sm font-semibold">
            [Nome] <span className="font-normal">{user?.name}</span>
          </p>
          <p className="text-sm font-semibold">
            [Cargo] <span className="font-normal">{user?.role}</span>
          </p>
          <p className="text-sm font-semibold">
            [Membro desde]{" "}
            <span className="font-normal">{user?.createdAt}</span>
          </p>
        </CardContent>
      </Card>
      <Card className="mx-2 my-1 mb-4">
        <CardContent className="flex flex-col space-y-1">
          <h1 className="mb-2 font-semibold text-xl">Status</h1>
          <p className="text-sm font-semibold">
            [Email] <span className="font-normal">{user?.email}</span>
          </p>
          <p className="text-sm font-semibold">
            [Telefone] <span className="font-normal">{user?.phone}</span>
          </p>
        </CardContent>
      </Card>
      <Card className="mx-2 mb-4">
        <CardContent className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="mb-2 font-semibold text-xl">Endereços</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Cadastrar</Button>
              </DialogTrigger>
              <AddressesFormComponent />
            </Dialog>
          </div>
          {user?.addresses.length === 0 ? (
            <p>Nenhum endereço cadastrado</p>
          ) : (
            user?.addresses.map((address, index) => (
              <Card key={index} className="my-2 mb-2">
                <CardContent className="flex flex-col items-center">
                  <div className="flex flex-col  gap-1">
                    <div className="flex items-center gap-2">
                      <House size={22} />
                      <p className="text-sm font-semibold">
                        Endereço principal
                      </p>
                    </div>
                    <p className="font-normal text-lg">
                      {address.street}, {address.number}, {address.city}
                    </p>
                    <span className="text-lg">
                      {address.neighborhood}, {address.zipCode}
                    </span>
                  </div>

                  <Button className="mt-2 p-5 w-full" variant="destructive">
                    Deletar
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </CardContent>
      </Card>
      s
    </>
  );
};

export default AddressesCardComponent;
