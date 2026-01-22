import { requiredAdmin } from "@/lib/authToken";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requiredAdmin();

  return <div>{children}</div>;
}
