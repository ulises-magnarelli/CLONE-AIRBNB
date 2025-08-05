import prisma from "../config/database.js";

export class AlojamientoRepository {
async findAll(filtros = {}, page = 1, limit = 10) {
  const where = {};

  if (filtros.cantHuespedes) {
    where.cantHuespedesMax = {
      gte: Number(filtros.cantHuespedes),
    };
  }

  if (filtros.precioMin && filtros.precioMax) {
    where.precioPorNoche = {
      gte: Number(filtros.precioMin),
      lte: Number(filtros.precioMax),
    };
  }

  if (filtros.caracteristicas && filtros.caracteristicas.length > 0) {
    where.caracteristicas = {
      some: {
        nombre: {
          in: filtros.caracteristicas,
        },
      },
    };
  }

  // ciudad y país se filtran de forma anidada
  if (filtros.ciudad || filtros.pais) {
    where.direccion = {
      ciudad: {
        AND: [
          filtros.ciudad ? { nombre: filtros.ciudad } : {},
          filtros.pais
            ? {
                pais: {
                  nombre: filtros.pais,
                },
              }
            : {},
        ],
      },
    };
  }

  return await prisma.alojamiento.findMany({
    where,
    include: {
      direccion: {
        include: {
          ciudad: { include: { pais: true } },
        },
      },
      fotos: true,
      caracteristicas: true,
      anfitrion: true,
    },
    skip: (page - 1) * limit,
    take: limit,
  });
}

  async findById(id) {
    return await prisma.alojamiento.findUnique({
      where: { id: Number(id) },
      include: {
        anfitrion: true,
        direccion: {
          include: {
            ciudad: {
              include: {
                pais: true,
              },
            },
          },
        },
        fotos: true,
        caracteristicas: true,
      },
    });
  }

  async save(alojamiento) {
    if (alojamiento.id) {
      return await prisma.alojamiento.update({
        where: { id: alojamiento.id },
        data: alojamiento,
      });
    } else {
      return await prisma.alojamiento.create({
        data: alojamiento,
      });
    }
  }

  async deleteById(id) {
    return await prisma.alojamiento.delete({
      where: { id: Number(id) },
    });
  }
}
