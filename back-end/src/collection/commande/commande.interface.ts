import { DishType } from "../dish/dish.interface";
import { User } from "../user/user.interface";

export interface DetailType {
  dish: DishType;
  qty: number;
  totalPriceRow: number;
  benefitsRow: number;
}

export interface RestoBenefits {
  mostBought: DetailType[];
  orderFrequence: DetailType[];
}

export interface Commande {
  _id?: any;
  date: Date;
  etat: Boolean;
  readyForDelivery: Boolean;
  detail: DetailType[];
  client: User;
  delivery_man: User;
  waitingForDeliverer: Boolean;
  delivery_price: number;
  delivery_place: String;
  client_contact: String;
  dish_price: Number;
}

export interface AdminBenefits {
  date: string;
  restoUser: User;
  restoBenefit: number;
  benefit: number;
}

export interface AdminOrders {
  date: string;
  orders: number;
}
