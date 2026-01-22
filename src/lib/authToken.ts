import { cookies } from "next/headers";
import { apiClient } from "./api";
import { UserTypes } from "@/types/user";
import { redirect } from "next/navigation";

const cookieName = "user_token";

export async function getToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(cookieName)?.value;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, token, {
    httpOnly: true,
    maxAge: 2592000,
    path: "/",
    sameSite: true,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function getUser(): Promise<UserTypes | null> {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }

    const user = await apiClient<UserTypes>("/user", {
      token: token,
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function requiredAdmin(): Promise<UserTypes> {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/access-denied");
  }

  return user;
}
