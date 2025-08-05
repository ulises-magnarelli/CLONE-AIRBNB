import { NotFoundError } from "../errors/AppError.js";
import { UsuarioService } from "../services/usuarioService.js";

export class UsuarioController {
  constructor() {
    this.usuarioService = new UsuarioService(); 
  }

  async findAll(req, res, next) {
    try {
      const usuarios = await this.usuarioService.findAll();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) throw new NotFoundError("ID inválido");
      const usuario = await this.usuarioService.findById(id);
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const usuario = await this.usuarioService.create(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = Number(req.params.id);
      const usuario = await this.usuarioService.delete(id);
      res.status(200).json(usuario);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const usuario = await this.usuarioService.update(id, req.body);
      res.status(200).json(usuario);
    } catch (error) {
  if (error.code === 'P2002') {
    return res.status(400).json({ error: "Ya existe un usuario con ese email" });
  }
  next(error);
}
  }
}
