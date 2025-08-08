import { OpinionRepository } from "../repositories/opinionRepository.js";
import { NotFoundError } from "../errors/AppError.js";

export class OpinionService {
  constructor() {
    this.repo = new OpinionRepository();
  }

  async crear(data) {
    const opinion = await this.repo.save(data);
    return this.toDTO(opinion);
  }

  async obtenerPorAlojamiento(alojamientoId) {
    const opiniones = await this.repo.findAllByAlojamiento(alojamientoId);
    return opiniones.map(this.toDTO);
  }

  async obtenerPorUsuario(usuarioId) {
    const opiniones = await this.repo.findAllByUsuario(usuarioId);
    return opiniones.map(this.toDTO);
  }

  toDTO(opinion) {
    return {
      id: opinion.id,
      comentario: opinion.comentario,
      puntuacion: opinion.puntuacion,
      fechaCreacion: opinion.fechaCreacion,
      autor: opinion.autor && {
        id: opinion.autor.id,
        nombre: opinion.autor.nombre,
        email: opinion.autor.email,
      },
      alojamiento: opinion.alojamiento && {
        id: opinion.alojamiento.id,
        nombre: opinion.alojamiento.nombre,
      }
    };
  }
}
