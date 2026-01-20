import { cookies } from "next/headers";

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
