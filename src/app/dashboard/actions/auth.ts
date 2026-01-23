import { deleteToken } from "@/lib/authToken";
import { redirect } from "next/navigation";

export async function logOutAction() {
  await deleteToken();
  redirect("/login");
}
