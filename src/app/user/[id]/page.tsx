"use server";
import { getUser } from "@/lib/authToken";
import ButtonComponent from "./_components/ButtonComponent/ButtonComponent";
import AddressesCardComponent from "./_components/AddressesCardComponent/AddressesCardComponent";

const UserProfile = async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return (
    <main className="h-screen  bg-app-background space-y-4">
      <div className="px-3 py-2 flex items-center gap-2 xl:p-10">
        <ButtonComponent />
        <h1 className="text-white text-xl">Perfil do Usuário</h1>
      </div>

      <div className="xl:items-center justify-center flex w-full flex-col mt-10s">
        <AddressesCardComponent user={user} />
      </div>
    </main>
  );
};

export default UserProfile;
