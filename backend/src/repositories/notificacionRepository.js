import prisma from '../config/database.js';

export class NotificacionRepository {
  async findByDestinatario(filters = {}) {
    const { destinatario, estado } = filters;

    const whereClause = {};
    if (destinatario) whereClause.usuarioId = Number(destinatario);
    if (estado !== undefined) whereClause.estado = Number(estado);

    return await prisma.notificacion.findMany({
      where: whereClause,
      orderBy: { fechaAlta: 'desc' }
    });
  }

  async findById(id) {
    return await prisma.notificacion.findUnique({
      where: { id: Number(id) }
    });
  }

  async create(notificacion) {
    return await prisma.notificacion.create({
      data: notificacion
    });
  }

  async update(notificacion) {
    return await prisma.notificacion.update({
      where: { id: notificacion.id },
      data: {
        estado: notificacion.estado,
        fechaLeida: notificacion.fechaLeida
      }
    });
  }
}
