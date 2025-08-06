import prisma from "../config/database.js";

export const reservaRepository = {
async create(data) {
  const reserva = await prisma.reserva.create({
    data,
  });

  // Volvé a buscar la reserva con include
  return await prisma.reserva.findUnique({
    where: { id: reserva.id },
    include: {
      alojamiento: {
        include: {
          direccion: {
            include: {
              ciudad: {
                include: {
                  pais: true,
                },
              },
            },
          },
          anfitrion: true,
        },
      },
      cambiosEstado: true,
    },
  });
},

  async findById(id) {
    return await prisma.reserva.findUnique({
      where: { id: Number(id) },
      include: {
        alojamiento: {
          include: {
            direccion: {
              include: {
                ciudad: { include: { pais: true } },
              },
            },
            anfitrion: true,
            caracteristicas: true,
            fotos: true,
          },
        },
        huespedReservador: true,
        cambiosEstado: true,
      },
    });
  },

  async findByUsuario(userId) {
    return await prisma.reserva.findMany({
      where: {
        OR: [
          { huespedReservadorId: Number(userId) },
          { alojamiento: { anfitrionId: Number(userId) } },
        ],
      },
      include: {
        alojamiento: {
          include: {
            direccion: {
              include: {
                ciudad: { include: { pais: true } },
              },
            },
            anfitrion: true,
            caracteristicas: true,
            fotos: true,
          },
        },
        huespedReservador: true,
        cambiosEstado: true,
      },
      orderBy: { fechaAlta: "desc" },
    });
  },

  async update(id, data) {
    return await prisma.reserva.update({
      where: { id: Number(id) },
      data,
      include: {
        alojamiento: {
          include: {
            direccion: {
              include: {
                ciudad: { include: { pais: true } },
              },
            },
            anfitrion: true,
            caracteristicas: true,
            fotos: true,
          },
        },
        huespedReservador: true,
        cambiosEstado: true,
      },
    });
  },

  async findReservasConfirmadasDelAlojamiento(alojamientoId) {
    return await prisma.reserva.findMany({
      where: {
        alojamientoId: Number(alojamientoId),
        estado: 1, // CONFIRMADA
      },
    });
  },
};
