import { Router } from "express";
import { OpinionController } from "../controllers/opinionController.js";

const router = Router();
const controller = new OpinionController();

router.post("/opiniones", controller.create.bind(controller));
router.get("/opiniones", controller.findByAlojamiento.bind(controller));
router.get("/opiniones/usuario", controller.findByUsuario.bind(controller));

export default router;
