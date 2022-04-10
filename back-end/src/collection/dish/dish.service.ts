
import { Dishes } from "../../common/response/response.interface";
import { Resto } from "../resto/resto.interface";
import { DishType } from "./dish.interface";
import { DishModel } from "./dish.schema";

class DishService {
    async getAll(): Promise<Dishes | null> {
        let dishes: DishType[];
        dishes = (await DishModel.find().exec()) as DishType[];
        let response = {
            code:200,
            message:"Liste de tous les plats",
            data : {
                dish: dishes
            }
        }
        if(dishes === null){
            response['code'] = 400;
            response['message'] = "aucun repas dans la liste";
        }
        return response;
    }
    async create(item: DishType): Promise<DishType> {
    return DishModel.create(item);
    }  
    async getById(id: string): Promise<DishType | null> {
        return DishModel.findById(id).exec();
    }
    async delete(id: string): Promise<boolean> {
        return DishModel.deleteOne({ _id: id }).then(() => true);
    }
    async update(item: DishType): Promise<DishType | null> {
        return DishModel
          .findByIdAndUpdate(item._id, item, { new: true })
          .exec();
    }
    async getByResto(id: string): Promise<DishType[] | null> {
        return DishModel.find({"resto._id":id}).exec();
    }
}

export const dishService = new DishService();