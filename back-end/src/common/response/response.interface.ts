import { User } from "../../collection/user/user.interface";
import { DishType } from "../../collection/dish/dish.interface";

export interface AuthenticationResponse {
  code: number,
  message: string,
  data : {
    user: User,
    token: string
  }
}

export interface Dishes{
  code: number,
  message: string,
  data : {
    dish: DishType[]
  }
}
export interface Dish{
  code: number,
  message: string,
  data : {
    dish: DishType
  }
}