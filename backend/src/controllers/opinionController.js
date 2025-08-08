import { OpinionService } from "../services/opinionService.js";

export class OpinionController {
  constructor() {
    this.service = new OpinionService();
  }

  async create(req, res, next) {
    try {
      const nueva = await this.service.crear(req.body);
      res.status(201).json(nueva);
    } catch (e) {
      next(e);
    }
  }

  async findByAlojamiento(req, res, next) {
    try {
      const data = await this.service.obtenerPorAlojamiento(req.query.alojamientoId);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async findByUsuario(req, res, next) {
    try {
      const data = await this.service.obtenerPorUsuario(req.query.usuarioId);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
}
