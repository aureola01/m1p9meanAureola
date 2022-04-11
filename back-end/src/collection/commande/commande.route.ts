import { Router } from "express";
import passport from "passport";
import { commandeController } from "./commande.controller";

class CommandeRoute {
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
        commandeController.getAll.bind(commandeController),
      )
      .post(
        passport.authenticate("jwt", { session: false }),
        commandeController.create.bind(commandeController),
      )
      .put(
        passport.authenticate("jwt", { session: false }),
        commandeController.update.bind(commandeController),
      );

    this.router
      .route("/restoBenefits/:_idResto")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getRestoBenefits.bind(commandeController),
      );

    this.router
      .route("/ekalyBenefits/:beginDate/:endDate")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getEkalyBenefits.bind(commandeController),
      );

    this.router
      .route("/ekalyOrders/:beginDate/:endDate")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getEkalyOrders.bind(commandeController),
      );

    this.router
      .route("/ekalyRestoBenefits/:beginDate/:endDate")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getAllRestoBenefits.bind(
          commandeController,
        ),
      );

    this.router
      .route("/notDelivered")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getNotDeliveredOrder.bind(
          commandeController,
        ),
      );

    this.router
      .route("/:commandeId")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getById.bind(commandeController),
      )

      .delete(
        passport.authenticate("jwt", { session: false }),
        commandeController.delete.bind(commandeController),
      );

    this.router
      .route("/client/:clientId")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getByClient.bind(commandeController),
      );
    this.router
      .route("/resto/:restoId")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getByResto.bind(commandeController),
      );
    this.router
      .route("/delivery/:deliveryId")
      .get(
        passport.authenticate("jwt", { session: false }),
        commandeController.getByDeliveryMan.bind(commandeController),
      );
  }
}
const commandeRoute = new CommandeRoute();

export const commandeRoutes = commandeRoute.router;
