import { Resto } from "../resto/resto.interface";

export interface DishType {
  _id?: any;
  resto: Resto;
  code: String;
  description: String;
  imageFile: string;
  image: String;
  name: String;
  pR: Number;
  pV: Number;
  visibility: Boolean;
}

export interface DishFile {
  dish: DishType;
  file: FormData;
}
