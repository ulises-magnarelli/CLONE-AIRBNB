import { NotFoundError } from "../errors/AppError.js";
import { AlojamientoRepository } from "../repositories/alojamientoRepository.js";

export class AlojamientoService {
  constructor() {
    this.repo = new AlojamientoRepository();
  }

  async findAll() {
    const alojamientos = await this.repo.findAll();
    return alojamientos.map(this.toDTO);
  }

  async findById(id) {
    const alojamiento = await this.repo.findById(id);
    if (!alojamiento) throw new NotFoundError("Alojamiento no encontrado");
    return this.toDTO(alojamiento);
  }

  async create(data) {
    const nuevo = await this.repo.save(data);
    return this.toDTO(nuevo);
  }

  async update(id, data) {
    const actualizado = await this.repo.save({ ...data, id: Number(id) });
    return this.toDTO(actualizado);
  }

  async delete(id) {
    return await this.repo.deleteById(id);
  }

  toDTO(alojamiento) {
    return {
      id: alojamiento.id,
      nombre: alojamiento.nombre,
      descripcion: alojamiento.descripcion,
      precioPorNoche: alojamiento.precioPorNoche,
      moneda: alojamiento.moneda,
      horarioCheckIn: alojamiento.horarioCheckIn,
      horarioCheckOut: alojamiento.horarioCheckOut,
      cantHuespedesMax: alojamiento.cantHuespedesMax,
      direccion: alojamiento.direccion,
      fotos: alojamiento.fotos,
      caracteristicas: alojamiento.caracteristicas,
      anfitrion: {
        id: alojamiento.anfitrion?.id,
        nombre: alojamiento.anfitrion?.nombre,
        email: alojamiento.anfitrion?.email,
      },
      opiniones: alojamiento.opiniones?.map((r) => ({
      id: r.id,
      comentario: r.comentario,
      puntuacion: r.puntuacion,
      fechaCreacion: r.fechaCreacion,
      autor: {
        id: r.autor.id,
        nombre: r.autor.nombre,
        email: r.autor.email
      }
    })) ?? [],
    };
  }
}
