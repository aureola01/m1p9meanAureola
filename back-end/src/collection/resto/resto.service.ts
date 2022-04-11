import { User } from "../user/user.interface";
import { Resto } from "./resto.interface";
import { RestoModel } from "./resto.schema";

class RestoService {
  async getAll(): Promise<Resto[] | null> {
    return RestoModel.find().exec();
  }
  async create(item: Resto): Promise<Resto> {
    return RestoModel.create(item);
  }
  async getById(id: string): Promise<Resto | null> {
    return RestoModel.findById(id).exec();
  }
  async delete(id: string): Promise<boolean> {
    return RestoModel.deleteOne({ _id: id }).then(() => true);
  }
  async update(item: Resto): Promise<Resto | null> {
    return RestoModel.findByIdAndUpdate(item._id, item, {
      new: true,
    }).exec();
  }
  async getByUser(id_user: string): Promise<Resto | null> {
    return RestoModel.findOne({ "user._id": id_user }).exec();
  }
}

export const restoService = new RestoService();
