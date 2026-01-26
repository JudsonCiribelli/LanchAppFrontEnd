import { StringifyOptions } from "querystring";

export type AddressesType = {
  id: String;
  userId: string;
  street: String;
  number: String;
  complement: String;
  neighborhood: String;
  city: String;
  state: String;
  zipCode: String;
  orders: String[];
};
