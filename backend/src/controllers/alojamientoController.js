import { AlojamientoService } from "../services/alojamientoService.js";

export class AlojamientoController {
  constructor() {
    this.service = new AlojamientoService();
  }

async findAll(req, res, next) {
  try {
    const {
      q,
      ciudad,
      pais,
      precioMin,
      precioMax,
      cantHuespedes,
      caracteristicas,
      fechaInicio,
      fechaFin,
      page,
      limit,
    } = req.query;

    const filtros = {};

    if (q && q.trim()) filtros.q = q.trim();
    if (ciudad) filtros.ciudad = ciudad;
    if (pais) filtros.pais = pais;
    if (precioMin && precioMax) {
      filtros.precioMin = Number(precioMin);
      filtros.precioMax = Number(precioMax);
    }
    if (cantHuespedes) filtros.cantHuespedes = Number(cantHuespedes);

    if (caracteristicas) {
      filtros.caracteristicas = Array.isArray(caracteristicas)
        ? caracteristicas
        : [caracteristicas];
    }
    
    // fechas: normalizar + autocorregir si vienen invertidas
    let fi = fechaInicio ? new Date(fechaInicio) : null;
    let ff = fechaFin    ? new Date(fechaFin)    : null;

    if (fi && ff && fi > ff) [fi, ff] = [ff, fi];

    if (fi) filtros.fechaInicio = fi;
    if (ff) filtros.fechaFin    = ff;
    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    const data = await this.service.repo.findAll(filtros, pageNumber, limitNumber);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

  async findById(req, res, next) {
    try {
      const data = await this.service.findById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const nuevo = await this.service.create(req.body);
      res.status(201).json(nuevo);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const actualizado = await this.service.update(req.params.id, req.body);
      res.json(actualizado);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  }
}
