import prisma from "../config/database.js";

export class UsuarioRepository {
  async findAll() {
    return await prisma.usuario.findMany();
  }

  async findById(id) {
    return await prisma.usuario.findUnique({ where: { id: Number(id) } });
  }

  async create(data) {
    const usuarioCreado = await prisma.usuario.create({ data });
    return { ...usuarioCreado, notificaciones: [] }; // por compatibilidad
  }

  async delete(id) {
    return await prisma.usuario.delete({ where: { id: Number(id) } });
  }

  async update(id, data) {
    return await prisma.usuario.update({
      where: { id: Number(id) },
      data,
    });
  }
}
