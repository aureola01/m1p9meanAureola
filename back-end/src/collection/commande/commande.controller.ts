import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller/controller-read.interface";
import { ControllerWrite } from "../../common/controller/controller-write.interface";
import { wrapToSendBackResponse } from "../../shared/wrap-to-send-back-response";
import {
  AdminBenefits,
  AdminOrders,
  Commande,
  DetailType,
  RestoBenefits,
} from "./commande.interface";
import { commandeService } from "./commande.service";

class CommandeController implements ControllerRead, ControllerWrite {
  getAll(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getAll(),
      res,
      next,
    );
  }
  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande | null>(
      commandeService.getById(req.params.restoId),
      res,
      next,
    );
  }
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande>(
      commandeService.create(req.body),
      res,
      next,
    );
  }
  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      commandeService.delete(req.params.commandeId),
      res,
      next,
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande | null>(
      commandeService.update(req.body),
      res,
      next,
    );
  }

  getByClient(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getByClient(req.params.clientId),
      res,
      next,
    );
  }
  getByResto(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getByResto(req.params.restoId),
      res,
      next,
    );
  }
  getByDeliveryMan(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getByResto(req.params.deliveryId),
      res,
      next,
    );
  }

  getRestoBenefits(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    wrapToSendBackResponse<RestoBenefits | null>(
      commandeService.getRestoBenefits(req.params._idResto),
      res,
      next,
    );
  }

  getEkalyBenefits(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    wrapToSendBackResponse<AdminBenefits[] | null>(
      commandeService.getEkalyBenefits(
        req.params.beginDate,
        req.params.endDate,
      ),
      res,
      next,
    );
  }

  getEkalyOrders(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    wrapToSendBackResponse<AdminOrders[] | null>(
      commandeService.getEkalyOrders(
        req.params.beginDate,
        req.params.endDate,
      ),
      res,
      next,
    );
  }

  getAllRestoBenefits(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    wrapToSendBackResponse<AdminBenefits[] | null>(
      commandeService.getAllRestoBenefits(
        req.params.beginDate,
        req.params.endDate,
      ),
      res,
      next,
    );
  }

  getNotDeliveredOrder(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    wrapToSendBackResponse<Commande[] | null>(
      commandeService.getNotDeliveredOrder(),
      res,
      next,
    );
  }
}

export const commandeController = new CommandeController();
