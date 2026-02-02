export type ProductsType = {
  id: string;
  name: string;
  price: string;
  description: string;
  banner: string;
  category?: {
    id: string;
    name: string;
    createdAt: string;
  };
  categoryId: string;
  createdAt: string;
};
