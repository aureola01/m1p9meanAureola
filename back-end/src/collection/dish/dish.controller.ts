import { NextFunction, Request, Response } from "express";
import { ControllerRead } from "../../common/controller/controller-read.interface";
import { ControllerWrite } from "../../common/controller/controller-write.interface";
import { cloudinaryService } from "../../shared/cloud/cloudinary.service";
import { wrapToSendBackResponse } from "../../shared/wrap-to-send-back-response";
import { DishType } from "./dish.interface";
import { dishService } from "./dish.service";

class DishController implements ControllerRead, ControllerWrite {
  getAll(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType[] | null>(
      dishService.getAll(),
      res,
      next,
    );
  }
  getById(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType | null>(
      dishService.getById(req.params.dishId),
      res,
      next,
    );
  }
  create(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType>(
      dishService.create(req.body),
      res,
      next,
    );
  }
  delete(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<boolean>(
      dishService.delete(req.params.dishId),
      res,
      next,
    );
  }

  uploadImage(req: any, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType>(
      cloudinaryService.uploadToCloudinary(req.files),
      res,
      next,
    );
  }

  update(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType | null>(
      dishService.update(req.body),
      res,
      next,
    );
  }
  getByResto(req: Request, res: Response, next: NextFunction): void {
    wrapToSendBackResponse<DishType[] | null>(
      dishService.getByResto(req.params.restoId),
      res,
      next,
    );
  }

  getByCondition(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    wrapToSendBackResponse<DishType[] | null>(
      dishService.getByCondition(req.params.condition),
      res,
      next,
    );
  }

  getByConditionResto(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    wrapToSendBackResponse<DishType[] | null>(
      dishService.getByConditionResto(
        req.params.condition,
        req.params.resto,
      ),
      res,
      next,
    );
  }
}

export const dishController = new DishController();
