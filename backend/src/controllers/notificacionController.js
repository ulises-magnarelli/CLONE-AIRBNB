import { ValidationError } from "../errors/AppError.js";

export class NotificacionController {
  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  async findByDestinatario(req, res, next) {
    try {
      const destinatario = req.query.destinatario;
      const estado = req.query.estado;

      if (!destinatario || isNaN(destinatario)) {
        throw new ValidationError("El id del destinatario es inválido");
      }

      const filters = { destinatario };
      if (estado !== undefined) {
        filters.estado = estado;
      }

      const notificaciones = await this.notificacionService.findByDestinatario(filters);
      res.status(200).json(notificaciones);
    } catch (error) {
      next(error);
    }
  }

  async updateEstado(req, res, next) {
    try {
      const id = req.params.id;

      if (!id || isNaN(id)) {
        throw new ValidationError("El id de la notificación es inválido");
      }

      const notificacion = await this.notificacionService.updateEstado(id);
      res.status(200).json(notificacion);
    } catch (error) {
      next(error);
    }
  }
}
