import { Router } from "express";
import passport from "passport";
import { dishController } from "./dish.controller";
import multer from "multer";
import { cloudinaryService } from "../../shared/cloud/cloudinary.service";

class DishRoute {
  router: Router;
  upload: multer;

  constructor() {
    this.router = Router();
    const storage = multer.memoryStorage();
    this.upload = multer({ storage });
    this.init();
  }

  private init() {
    this.router
      .route("/uploadImage")
      .post(
        passport.authenticate("jwt", { session: false }),
        this.upload.array("files"),
        dishController.uploadImage.bind(dishController),
      );
    this.router
      .route("/")
      .get(
        passport.authenticate("jwt", { session: false }),
        dishController.getAll.bind(dishController),
      )
      .post(
        passport.authenticate("jwt", { session: false }),
        dishController.create.bind(dishController),
      )
      .put(
        passport.authenticate("jwt", { session: false }),
        dishController.update.bind(dishController),
      );
    this.router
      .route("/condition/:condition")
      .get(
        passport.authenticate("jwt", { session: false }),
        dishController.getByCondition.bind(dishController),
      );

    this.router
      .route("/condition/:condition/:resto")
      .get(
        passport.authenticate("jwt", { session: false }),
        dishController.getByConditionResto.bind(dishController),
      );

    this.router
      .route("/:dishId")
      .get(
        passport.authenticate("jwt", { session: false }),
        dishController.getById.bind(dishController),
      )

      .delete(
        passport.authenticate("jwt", { session: false }),
        dishController.delete.bind(dishController),
      );
    this.router
      .route("/resto/:restoId")
      .get(
        passport.authenticate("jwt", { session: false }),
        dishController.getByResto.bind(dishController),
      );
  }
}
const dishRoute = new DishRoute();

export const dishRoutes = dishRoute.router;
