import { User } from "../user/user.interface";
import { Commande } from "./commande.interface";
import { CommandeModel } from "./commande.schema";

class CommandeService {
    async getAll(): Promise<Commande[] | null> {
        return CommandeModel.find().exec();
    }
    async create(item: Commande): Promise<Commande> {
    return CommandeModel.create(item);
    }  
    async getById(id: string): Promise<Commande | null> {
        return CommandeModel.findById(id).exec();
    }
    async delete(id: string): Promise<boolean> {
        return CommandeModel.deleteOne({ _id: id }).then(() => true);
    }
    async update(item: Commande): Promise<Commande | null> {
        return CommandeModel
          .findByIdAndUpdate(item._id, item, { new: true })
          .exec();
    }
    async getByClient(id: string): Promise<Commande[] | null> {
        return CommandeModel.find({"client._id":id}).exec();
    }
    async getByResto(id: string): Promise<Commande[] | null> {
        return CommandeModel.find({"detail.dish.user._id":id}).exec();
    }
    async getByDeliveryMan(id: string): Promise<Commande[] | null> {
        return CommandeModel.find({"delivery_man._id":id}).exec();
    }
    async getOrderNotDelivered(id: string): Promise<Commande[] | null> {
        return CommandeModel.find({"delivery_man._id":id, "etat": false}).exec();
    }
    async deliver(id: String): Promise<Commande | null> {
        return CommandeModel 
          .findByIdAndUpdate(id, {"etat":true}, { new: true })
          .exec();
    }
}

export const commandeService = new CommandeService();