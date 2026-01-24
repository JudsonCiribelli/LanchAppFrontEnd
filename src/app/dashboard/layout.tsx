import { getUser, requiredAdmin } from "@/lib/authToken";
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
      <main className="bg-app-background w-full">{children}</main>
    </div>
  );
}
