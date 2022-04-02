import { Router } from "express";
import * as passport from "passport";
import { restoController } from "./resto.controller";

class RestoRoute {
    router: Router;
  
    constructor() {
      this.router = Router();
      this.init();
    }
  
    private init() {
        
        this.router
        .route("/")
        .get(
            passport.authenticate("jwt", { session: false }),
            restoController.getAll.bind(restoController),
        )
        .post(restoController.create.bind(restoController))
        .put(restoController.update.bind(restoController))
        .delete(
            // passport.authenticate("jwt", { session: false }),
            restoController.delete.bind(restoController),
        );
        this.router
        .route("/:restoId")
        .get(
            passport.authenticate("jwt", { session: false }),
            restoController.getById.bind(restoController),
        )
        .put(restoController.update.bind(restoController))
        .delete(
            // passport.authenticate("jwt", { session: false }),
            restoController.delete.bind(restoController),
        );
    }
}
const restoRoute = new RestoRoute();

export const restoRoutes = restoRoute.router;