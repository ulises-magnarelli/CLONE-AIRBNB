import prisma from "../config/database.js";

export class OpinionRepository {
  async save(data) {
    return await prisma.opinion.create({
      data,
      include: {
      autor: true, // ⬅️ Esto incluye el usuario que hizo la opinión
    },
    });
  }

  async findAllByAlojamiento(alojamientoId) {
    return await prisma.opinion.findMany({
      where: { alojamientoId: Number(alojamientoId) },
      include: {
        autor: true,
      },
      orderBy: { fechaCreacion: 'desc' },
    });
  }

  async findAllByUsuario(usuarioId) {
    return await prisma.opinion.findMany({
      where: { autorId: Number(usuarioId) },
      include: {
        alojamiento: true,
      },
      orderBy: { fechaCreacion: 'desc' },
    });
  }
}
