import { EstadoNotificacion } from "../model/enums/EstadoNotificacion.js";
import { NotFoundError } from "../errors/AppError.js";
import { nombreEnum } from "../utils/nombreEnum.js";

export class NotificacionService {
  constructor(notificacionRepository, usuarioRepository) {
    this.notificacionRepository = notificacionRepository;
    this.usuarioRepository = usuarioRepository;
  }

  async findByDestinatario(filters = {}) {
    const usuario = await this.usuarioRepository.findById(filters.destinatario);
    if (!usuario) {
      throw new NotFoundError(`Usuario con ID ${filters.destinatario} no encontrado`);
    }

    const notificaciones = await this.notificacionRepository.findByDestinatario(filters);

    return notificaciones.map(n => this.toDTO(n));
  }

  async updateEstado(id) {
    const notificacion = await this.notificacionRepository.findById(id);
    if (!notificacion) {
      throw new NotFoundError(`Notificación con ID ${id} no encontrada`);
    }

    notificacion.estado = EstadoNotificacion.LEIDA;
    notificacion.fechaLeida = new Date();

    const actualizada = await this.notificacionRepository.update(notificacion);
    return this.toDTO(actualizada);
  }

  toDTO(notificacion) {
    return {
      id: notificacion.id,
      mensaje: notificacion.mensaje,
      fechaAlta: notificacion.fechaAlta.toLocaleString("es-AR"),
      estado: nombreEnum(EstadoNotificacion, notificacion.estado),
      fechaLeida: notificacion.fechaLeida
    };
  }
}
