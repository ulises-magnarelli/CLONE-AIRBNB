import { NotFoundError } from "../errors/AppError.js";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";

export class UsuarioService {
  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  async findAll() {
    const usuarios = await this.usuarioRepository.findAll();
    return usuarios.map(this.toDTO);
  }

  async findById(id) {
    const usuario = await this.usuarioRepository.findById(id);
    return this.toDTO(usuario);
  }

  async create(usuario) {
    const usuarioCreado = await this.usuarioRepository.create(usuario);
    return this.toDTO(usuarioCreado);
  }

  async delete(id) {
    const usuario = await this.usuarioRepository.delete(id);
    return this.toDTO(usuario);
  }

  async update(id, usuario) {
    const usuarioModificado = await this.usuarioRepository.update(id, usuario);
    return this.toDTO(usuarioModificado);
  }
  
  toDTO(usuario) {
    if (!usuario) throw new NotFoundError("Usuario no encontrado");
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      tipo: usuario.tipo,
      notificaciones: usuario.notificaciones ?? [],
      opiniones: usuario.opiniones?.map((r) => ({
        id: r.id,
        comentario: r.comentario,
        puntuacion: r.puntuacion,
        fechaCreacion: r.fechaCreacion,
        alojamiento: {
          id: r.alojamiento.id,
          nombre: r.alojamiento.nombre
        }
      })) ?? [],
    };
  }
}
