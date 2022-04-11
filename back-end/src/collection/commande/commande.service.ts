import { DishType } from "../dish/dish.interface";
import { restoService } from "../resto/resto.service";
import { User } from "../user/user.interface";
import {
  AdminBenefits,
  AdminOrders,
  Commande,
  DetailType,
  RestoBenefits,
} from "./commande.interface";
import { CommandeModel } from "./commande.schema";

class CommandeService {
  async getAll(): Promise<Commande[] | null> {
    return CommandeModel.find().sort({ date: "desc" }).exec();
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
    return CommandeModel.findByIdAndUpdate(item._id, item, {
      new: true,
    }).exec();
  }
  async getByClient(id: string): Promise<Commande[] | null> {
    return CommandeModel.find({ "client._id": id })
      .sort({ date: "desc" })
      .exec();
  }
  async getByResto(id: string): Promise<Commande[] | null> {
    return CommandeModel.find({
      "detail.dish.resto.user._id": id,
    })
      .sort({ date: "desc" })
      .exec();
  }
  async getOrderedByResto(id: string): Promise<Commande[] | null> {
    return CommandeModel.find({
      "detail.dish.resto.user._id": id,
      etat: true,
    })
      .sort({ date: "desc" })
      .exec();
  }
  async getByDeliveryMan(id: string): Promise<Commande[] | null> {
    return CommandeModel.find({ "delivery_man._id": id }).exec();
  }

  async getNotDeliveredOrder(): Promise<Commande[] | null> {
    return CommandeModel.find({
      etat: false,
      waitingForDeliverer: true,
    })
      .sort({ date: "asc" })
      .exec();
  }

  async getDeliveredOrderByPeriod(
    beginDate: string,
    endDate: string,
  ): //
  Promise<Commande[] | null> {
    const toCastWithDate = "T22:00:00.000+00:00";
    // "2022-04-01T22:00:00.000+00:00"
    return CommandeModel.find({
      etat: true,
      date: {
        $gte: beginDate + toCastWithDate,
        $lte: endDate + toCastWithDate,
      },
    })
      .sort({ date: "asc" })
      .exec();
  }

  async getTop5MostBoughtProducts(
    _idResto: string,
  ): Promise<DetailType[] | null> {
    const restaurantOrders = await this.getOrderedByResto(_idResto);
    let dishesResult: DetailType[] = [];
    for (const order of restaurantOrders) {
      for (const dish of order.detail) {
        let index = dishesResult.findIndex(
          (x) => x.dish.code === dish.dish.code,
        );
        dish.benefitsRow =
          (dish.qty as number) *
          ((dish.dish.pV as number) - (dish.dish.pR as number));
        if (index === -1) {
          dishesResult.push(dish);
        } else {
          dishesResult[index].qty += dish.qty;
          dishesResult[index].totalPriceRow += dish.totalPriceRow;
          dishesResult[index].benefitsRow += dish.benefitsRow;
        }
      }
    }
    dishesResult.sort(
      (a, b) => (b.qty as number) - (a.qty as number),
    );
    return dishesResult;
  }

  async getOrderFrequence(
    _idResto: string,
  ): Promise<DetailType[] | null> {
    const restaurantOrders = await this.getByResto(_idResto);
    let dishesResult: DetailType[] = [];
    for (const order of restaurantOrders) {
      for (const dish of order.detail) {
        let index = dishesResult.findIndex(
          (x) => x.dish.code === dish.dish.code,
        );
        dish.benefitsRow =
          (dish.qty as number) *
          ((dish.dish.pV as number) - (dish.dish.pR as number));
        if (index === -1) {
          dishesResult.push(dish);
        } else {
          dishesResult[index].qty += dish.qty;
          dishesResult[index].totalPriceRow += dish.totalPriceRow;
          dishesResult[index].benefitsRow += dish.benefitsRow;
        }
      }
    }
    dishesResult.sort(
      (a, b) => (b.qty as number) - (a.qty as number),
    );
    return dishesResult;
  }

  async getRestoBenefits(
    _idResto: string,
  ): Promise<RestoBenefits | null> {
    return {
      mostBought: await this.getTop5MostBoughtProducts(_idResto),
      orderFrequence: await this.getOrderFrequence(_idResto),
    };
  }

  async getEkalyOrders(
    beginDate: string,
    endDate: string,
  ): Promise<AdminOrders[]> {
    const commandedOrder = await this.getDeliveredOrderByPeriod(
      beginDate,
      endDate,
    );
    let orderResult: AdminOrders[] = [];
    for (const order of commandedOrder) {
      for (const dish of order.detail) {
        let index = orderResult.findIndex(
          (x) => x.date === order.date.toDateString(),
        );

        if (index != -1) {
          orderResult[index].orders += 1;
        } else {
          const orderToPush = {
            date: order.date.toDateString(),
            orders: 1,
          };
          orderResult.push(orderToPush);
        }
      }
    }
    return orderResult;
  }

  async getEkalyBenefits(
    beginDate: string,
    endDate: string,
  ): Promise<AdminBenefits[]> {
    const commandedOrder = await this.getDeliveredOrderByPeriod(
      beginDate,
      endDate,
    );
    let benefitResult: AdminBenefits[] = [];
    let count = 0;
    for (const order of commandedOrder) {
      for (const dish of order.detail) {
        let index = benefitResult.findIndex(
          (x) => x.date === order.date.toDateString(),
        );
        dish.benefitsRow =
          (dish.qty as number) *
          ((dish.dish.pV as number) - (dish.dish.pR as number));

        if (index != -1) {
          benefitResult[index].restoBenefit += dish.benefitsRow;
          if (count === 0) {
            benefitResult[index].benefit +=
              (dish.totalPriceRow * dish.dish.resto.pourcentage) /
              100;
          } else {
            benefitResult[index].benefit +=
              (dish.totalPriceRow * dish.dish.resto.pourcentage) /
                100 +
              order.delivery_price / 2;
          }
        } else {
          const benefitToPush = {
            restoUser: undefined,
            date: order.date.toDateString(),
            restoBenefit: dish.benefitsRow,
            benefit:
              (dish.totalPriceRow * dish.dish.resto.pourcentage) /
                100 +
              order.delivery_price / 2,
          };
          benefitResult.push(benefitToPush);
        }
        count++;
      }
      count = 0;
    }
    return benefitResult;
  }

  async getAllRestoBenefits(
    beginDate: string,
    endDate: string,
  ): Promise<AdminBenefits[]> {
    const commandedOrder = await this.getDeliveredOrderByPeriod(
      beginDate,
      endDate,
    );
    let benefitResult: AdminBenefits[] = [];
    let count = 0;
    for (const order of commandedOrder) {
      for (const dish of order.detail) {
        let index = benefitResult.findIndex(
          (x) => x.restoUser.login === dish.dish.resto.user.login,
        );

        dish.benefitsRow =
          (dish.qty as number) *
          ((dish.dish.pV as number) - (dish.dish.pR as number));

        if (index != -1) {
          benefitResult[index].restoBenefit += dish.benefitsRow;
          benefitResult[index].benefit +=
            (dish.totalPriceRow * dish.dish.resto.pourcentage) / 100;
        } else {
          const benefitToPush = {
            restoUser: dish.dish.resto.user,
            date: order.date.toDateString(),
            restoBenefit: dish.benefitsRow,
            benefit:
              (dish.totalPriceRow * dish.dish.resto.pourcentage) /
              100,
          };
          benefitResult.push(benefitToPush);
        }

        count++;
      }
      count = 0;
    }
    benefitResult = await this.completeMissingResto(benefitResult);
    return benefitResult;
  }

  async completeMissingResto(
    benefits: AdminBenefits[],
  ): Promise<AdminBenefits[]> {
    const restos = await restoService.getAll();
    for (const resto of restos) {
      const index = benefits.findIndex(
        (x) => x.restoUser.login === resto.user.login,
      );
      if (index === -1) {
        const benefitToPush = {
          restoUser: resto.user,
          date:
            new Date().getFullYear().toString() +
            "-" +
            this.getMonth() +
            "-" +
            new Date().getDate().toString(),
          restoBenefit: 0,
          benefit: 0,
        };
        benefits.push(benefitToPush);
      }
    }
    return benefits;
  }

  getMonth() {
    if (new Date().getMonth().toString().length != 1) {
      return new Date().getMonth() + 1;
    } else {
      return "0" + (new Date().getMonth() + 1);
    }
  }
}

export const commandeService = new CommandeService();
