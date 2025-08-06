import { Router } from "express";
import { ReservaController } from "../controllers/reservaController.js";

const router = Router();
const controller = new ReservaController();

router.post("/reservas", (req, res, next) =>
  controller.crear(req, res, next)
);

router.patch("/reservas/:id", (req, res, next) =>
  controller.actualizar(req, res, next)
);

router.get("/reservas", (req, res, next) =>
  controller.getReservas(req, res, next)
);

export default router;
