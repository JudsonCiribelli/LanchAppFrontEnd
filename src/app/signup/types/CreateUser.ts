export type CreateUserType = {
  name: string;
  id: string;
  email: string;
  password: string;
  phone: string;
  role: "ADMIN" | "CLIENT";
  createdAt: string;
  uptadedAt: string;
};
