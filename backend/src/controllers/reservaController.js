import { reservaService } from "../services/reservaService.js";
import { ValidationError } from "../errors/AppError.js";

export class ReservaController {
  async crear(req, res, next) {
    try {
      const datos = req.body;

      if (!datos.usuarioId || !datos.alojamientoId || !datos.rangoFechas) {
        throw new ValidationError("Faltan datos obligatorios para crear la reserva");
      }

      datos.rangoFechas.fechaInicio = new Date(datos.rangoFechas.fechaInicio);
      datos.rangoFechas.fechaFin = new Date(datos.rangoFechas.fechaFin);

      const reserva = await reservaService.crearReserva(datos);
      res.status(201).json(reserva);
    } catch (error) {
      next(error);
    }
  }

  async actualizar(req, res, next) {
    try {
      const id = req.params.id;
      const { estado, motivo, rangoFechas, cantidadHuespedes } = req.body;

      let reservaActualizada;

      switch (estado?.toLowerCase()) {
        case "cancelada":
          reservaActualizada = await reservaService.cancelarReserva(id, motivo);
          break;

        case "aceptada":
        case "confirmada":
          reservaActualizada = await reservaService.aceptarReserva(id);
          break;

        default:
          reservaActualizada = await reservaService.modificarReserva(id, {
            rangoFechas,
            cantidadHuespedes,
          });
      }

      res.status(200).json(reservaActualizada);
    } catch (error) {
      next(error);
    }
  }

  async getReservas(req, res, next) {
    try {
      const usuarioId = req.query.id;

      if (!usuarioId) {
        throw new ValidationError("Falta el parámetro 'id' de usuario");
      }

      const reservas = await reservaService.getReservasDeUsuario(usuarioId);
      res.status(200).json(reservas);
    } catch (error) {
      next(error);
    }
  }
}
