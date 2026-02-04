import { ItemsType } from "./items";
import { OrderStatus } from "./orderStatus";
import { OrderType } from "./orderType";

export interface OrderTypes {
  id: string;
  table?: number;
  draft: boolean;
  name: string;
  status: OrderStatus;
  type: OrderType;
  createdAt: string;
  items?: ItemsType[];
}
