import { Resto } from "../resto/resto.interface";
import { DishFile, DishType } from "./dish.interface";
import { DishModel } from "./dish.schema";
import { cloudinaryService } from "../../shared/cloud/cloudinary.service";

class DishService {
  async getAll(): Promise<DishType[] | null> {
    return DishModel.find({ visibility: true }).exec();
  }
  async create(item: DishType): Promise<DishType> {
    return await DishModel.create(item);
  }
  async getById(id: string): Promise<DishType | null> {
    return DishModel.findById(id).exec();
  }
  async delete(id: string): Promise<boolean> {
    return DishModel.deleteOne({ _id: id }).then(() => true);
  }
  async update(item: DishType): Promise<DishType | null> {
    return await DishModel.findByIdAndUpdate(item._id, item, {
      new: true,
    }).exec();
  }
  async getByResto(id: string): Promise<DishType[] | null> {
    return DishModel.find({ "resto.user._id": id }).exec();
  }
  async getByCondition(
    condition: string,
  ): Promise<DishType[] | null> {
    return DishModel.find({
      $or: [
        { description: { $regex: condition, $options: "i" } },
        { name: { $regex: condition, $options: "i" } },
        {
          "resto.user.firstName": {
            $regex: condition,
            $options: "i",
          },
        },
        {
          "resto.user.lastName": { $regex: condition, $options: "i" },
        },
      ],
    }).exec();
  }

  async getByConditionResto(
    condition: string,
    resto: string,
  ): Promise<DishType[] | null> {
    return DishModel.find({
      $or: [
        {
          description: { $regex: condition, $options: "i" },
          "resto.user._id": resto,
        },
        {
          name: { $regex: condition, $options: "i" },
          "resto.user._id": resto,
        },
        {
          "resto.user.firstName": {
            $regex: condition,
            $options: "i",
          },
          "resto.user._id": resto,
        },
        {
          "resto.user.lastName": { $regex: condition, $options: "i" },
          "resto.user._id": resto,
        },
      ],
    }).exec();
  }
}

export const dishService = new DishService();
