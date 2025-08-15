import { Router } from "express";
import { AuthController } from "../controllers/authController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = Router();
const controller = new AuthController();

router.post("/auth/register", controller.register.bind(controller));
router.post("/auth/login", controller.login.bind(controller));
router.post("/auth/logout", controller.logout.bind(controller));
router.get("/auth/me", requireAuth, controller.me.bind(controller));

export default router;
