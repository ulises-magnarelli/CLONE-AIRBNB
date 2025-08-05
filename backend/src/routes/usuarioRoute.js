import { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController.js";

const router = Router();
const controller = new UsuarioController();

router.get("/usuarios", controller.findAll.bind(controller));
router.get("/usuarios/:id", controller.findById.bind(controller));
router.post("/usuarios", controller.create.bind(controller));
router.put("/usuarios/:id", controller.update.bind(controller));
router.delete("/usuarios/:id", controller.delete.bind(controller));

export default router;

