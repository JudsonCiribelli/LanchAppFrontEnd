export interface ItemsType {
  id: string;
  orderId: string;
  unitPrice: string;
  amount: number;
  product: {
    name: string;
    price: string;
    description: string;
    banner: string;
  };
  createdAt: string;
}
