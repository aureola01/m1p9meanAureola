import * as mongoose from "mongoose";
import { Commande } from "./commande.interface";
import { DishTypeSchema } from "../dish/dish.schema";
import { userSchema } from "../user/user.schema";

export interface CommandeDocument
  extends Commande,
    mongoose.Document {}

export const DetailTypeSchema = new mongoose.Schema({
  dish: { type: DishTypeSchema, required: true },
  qty: { type: Number, required: true },
  totalPriceRow: { type: Number, required: false },
  benefitsRow: { type: Number, required: false },
});

export const CommandeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  etat: { type: Boolean, required: true },
  readyForDelivery: { type: Boolean, required: true },
  detail: { type: [DetailTypeSchema], required: true },
  client: { type: userSchema, required: true },
  waitingForDeliverer: { type: Boolean },
  delivery_man: { type: userSchema },
  delivery_price: { type: Number, required: false },
  delivery_place: { type: String, required: true },
  client_contact: { type: String, required: true },
  dish_price: { type: Number, required: false },
});

export const CommandeModel = mongoose.model<CommandeDocument>(
  "Commande",
  CommandeSchema,
);
