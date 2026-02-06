import { requiredAdmin } from "@/lib/authToken";
import React from "react";
import SideBarComponent from "./_components/SideBarComponent/SideBarComponent";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requiredAdmin();

  return (
    <div className="flex h-screen overflow-hidden text-white">
      <SideBarComponent userName={user.name} userId={user.id} />
      <main className="flex-1 bg-app-background w-full p-4 overflow-y-auto scrollbar-custom xl:p-10">
        <div className="container max-w-full px-4 py-6">{children}</div>
      </main>
    </div>
  );
}
