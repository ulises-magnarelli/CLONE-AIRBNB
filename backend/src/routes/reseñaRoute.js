import express from 'express';
import * as reseñaController from '../controllers/reseñaController.js';

const router = express.Router();

router.post('/', reseñaController.crearReseña);

export default router;
