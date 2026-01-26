import { AddressesType } from "./address";

export interface UserTypes {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  addresses: AddressesType[];
  orders: string[];
}
