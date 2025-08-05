import { Router } from "express";
import { AlojamientoController } from "../controllers/alojamientoController.js";

const router = Router();
const controller = new AlojamientoController();

router.get("/alojamientos", controller.findAll.bind(controller));
router.get("/alojamientos/:id", controller.findById.bind(controller));
router.post("/alojamientos", controller.create.bind(controller));
router.put("/alojamientos/:id", controller.update.bind(controller));
router.delete("/alojamientos/:id", controller.delete.bind(controller));

export default router;
