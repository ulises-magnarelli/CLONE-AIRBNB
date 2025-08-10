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
        filtros.ciudad
          ? { nombre: { contains: filtros.ciudad, mode: 'insensitive' } }
          : {},
        filtros.pais
          ? { pais: { nombre: { contains: filtros.pais, mode: 'insensitive' } } }
          : {},
      ],
    },
  };
}



  const tieneInicio = Boolean(filtros.fechaInicio);
  const tieneFin = Boolean(filtros.fechaFin);

  if (tieneInicio || tieneFin) {
    const overlap = { estado: 1 }; // 1 = CONFIRMADA (según tu schema)
    const conds = [];

    // reglas de solape:
    // - si vienen ambas: res.inicio < finBusqueda && res.fin > inicioBusqueda
    // - solo inicio:     res.fin    > inicioBusqueda
    // - solo fin:        res.inicio < finBusqueda
    if (tieneInicio && tieneFin) {
      conds.push({ fechaInicio: { lt: new Date(filtros.fechaFin) } });
      conds.push({ fechaFin: { gt: new Date(filtros.fechaInicio) } });
    } else if (tieneInicio) {
      conds.push({ fechaFin: { gt: new Date(filtros.fechaInicio) } });
    } else if (tieneFin) {
      conds.push({ fechaInicio: { lt: new Date(filtros.fechaFin) } });
    }

    overlap.AND = conds;

    where.reservas = { none: overlap };
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
        opiniones: {
        include: { autor: true },
        orderBy: { fechaCreacion: 'desc' },
      }
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
