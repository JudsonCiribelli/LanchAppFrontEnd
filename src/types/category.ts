import { ProductsType } from "@/app/dashboard/products/types/products";

export interface CategoryTypes {
  id: string;
  name: string;
  createdAt: string;
  products?: ProductsType[];
  updatedAt: string;
}
