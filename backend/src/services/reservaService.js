import { CambioEstadoReserva } from "../model/reserva/CambioEstadoReserva.js";
import { Notificacion } from "../model/Notificacion.js";
import { reservaRepository } from "../repositories/reservaRepository.js";
import { UsuarioRepository } from "../repositories/usuarioRepository.js";
import { AlojamientoRepository } from "../repositories/alojamientoRepository.js";
import { NotificacionRepository } from "../repositories/notificacionRepository.js";
import { nombreEnum } from "../model/enums/nombreEnum.js";
import { NotFoundError, ValidationError } from "../errors/AppError.js";
import { EstadoReserva } from "../model/enums/EstadoReserva.js";

const usuarioRepository = new UsuarioRepository();
const alojamientoRepository = new AlojamientoRepository();
const notificacionRepository = new NotificacionRepository();

export const reservaService = {


  async crearReserva(data) {
    const usuario = await usuarioRepository.findById(data.usuarioId);
    const alojamiento = await alojamientoRepository.findById(data.alojamientoId);

    if (!usuario) throw new NotFoundError("Usuario no encontrado");
    if (!alojamiento) throw new NotFoundError("Alojamiento no encontrado");

    this.verificarCapacidad(alojamiento, data.cantidadHuespedes);
    await this.verificarDisponibilidad(alojamiento.id, data.rangoFechas);

    const reservaCreada = await reservaRepository.create({
      huespedReservadorId: data.usuarioId,
      alojamientoId: data.alojamientoId,
      cantidadHuespedes: data.cantidadHuespedes,
      fechaInicio: new Date(data.rangoFechas.fechaInicio),
      fechaFin: new Date(data.rangoFechas.fechaFin),
      estado: EstadoReserva.PENDIENTE,
      precioPorNoche: alojamiento.precioPorNoche,
      cambiosEstado: {
        create: {
          fecha: new Date(),
          estado: EstadoReserva.PENDIENTE,
          motivo: "Reserva creada",
          usuarioId: data.usuarioId,
        },
      },
    });

    await notificacionRepository.create(
      Notificacion.crearNotificacionReservaCreada(reservaCreada)
    );

    return this.toDTO(reservaCreada);
  },




  async cancelarReserva(id, motivo = "Sin motivo") {
    const reserva = await reservaRepository.findById(id);
    this.validarModificable(reserva, "cancelar");

    const updated = await reservaRepository.update(id, {
      estado: EstadoReserva.CANCELADA,
      cambiosEstado: {
        create: {
          fecha: new Date(),
          estado: EstadoReserva.CANCELADA,
          motivo,
          usuarioId: reserva.huespedReservadorId,
        },
      },
    });

    await notificacionRepository.create(
      Notificacion.crearNotificacionReservaCancelada(updated, motivo)
    );

    return this.toDTO(updated);
  },




  async aceptarReserva(id) {
    const reserva = await reservaRepository.findById(id);
    this.validarModificable(reserva, "aceptar");

    const updated = await reservaRepository.update(id, {
      estado: EstadoReserva.CONFIRMADA,
      cambiosEstado: {
        create: {
          fecha: new Date(),
          estado: EstadoReserva.CONFIRMADA,
          motivo: "Reserva aceptada por anfitrión",
          usuarioId: reserva.alojamiento.anfitrionId,
        },
      },
    });

    await notificacionRepository.create(
      Notificacion.crearNotificacionReservaAceptada(updated)
    );

    return this.toDTO(updated);
  },




  async modificarReserva(id, nuevosDatos) {
    const reserva = await reservaRepository.findById(id);
    this.validarModificable(reserva, "modificar");

    const updates = {};
    let motivo = "Reserva modificada";

    if (nuevosDatos.rangoFechas) {
      await this.verificarDisponibilidad(
        reserva.alojamientoId,
        nuevosDatos.rangoFechas,
        id
      );
      updates.fechaInicio = new Date(nuevosDatos.rangoFechas.fechaInicio);
      updates.fechaFin = new Date(nuevosDatos.rangoFechas.fechaFin);
    }

    if (nuevosDatos.cantidadHuespedes) {
      this.verificarCapacidad(reserva.alojamiento, nuevosDatos.cantidadHuespedes);
      updates.cantidadHuespedes = nuevosDatos.cantidadHuespedes;
    }

    updates.cambiosEstado = {
      create: {
        fecha: new Date(),
        estado: reserva.estado,
        motivo,
        usuarioId: reserva.huespedReservadorId,
      },
    };

    const updated = await reservaRepository.update(id, updates);

    return this.toDTO(updated);
  },




  async getReservasDeUsuario(usuarioId) {
    const usuario = await usuarioRepository.findById(usuarioId);
    if (!usuario) throw new NotFoundError("Usuario no encontrado");

    const reservas = await reservaRepository.findByUsuario(usuarioId);
    return reservas.map(this.toDTO);
  },

  // --- Utilidades privadas

  verificarCapacidad(alojamiento, cant) {
    if (cant > alojamiento.cantHuespedesMax) {
      throw new ValidationError("El alojamiento no permite esa cantidad de huéspedes");
    }
  },




  async verificarDisponibilidad(alojamientoId, rangoFechas, reservaAExcluir = null) {
    const reservas = await reservaRepository.findReservasConfirmadasDelAlojamiento(alojamientoId);

    const { fechaInicio, fechaFin } = rangoFechas;

    const solapada = reservas.some((r) => {
      if (reservaAExcluir && r.id === Number(reservaAExcluir)) return false;
      return !(
        new Date(r.fechaFin) <= new Date(fechaInicio) ||
        new Date(r.fechaInicio) >= new Date(fechaFin)
      );
    });

    if (solapada) {
      throw new ValidationError("El alojamiento no está disponible en esas fechas");
    }
  },

  toDTO(reserva) {
    return {
      id: reserva.id,
      fechaAlta: reserva.fechaAlta,
      huespedReservadorId: reserva.huespedReservadorId,
      cantidadHuespedes: reserva.cantidadHuespedes,
      alojamiento: {
        id: reserva.alojamiento.id,
        nombre: reserva.alojamiento.nombre,
        anfitrion: reserva.alojamiento.anfitrion,
        direccion: reserva.alojamiento.direccion,
      },
      rangoFechas: {
        fechaInicio: reserva.fechaInicio,
        fechaFin: reserva.fechaFin,
      },
      estado: nombreEnum(EstadoReserva, reserva.estado),
      precioPorNoche: reserva.precioPorNoche,
      historialDeCambios: reserva.cambiosEstado.map((c) => ({
        fecha: c.fecha,
        estado: nombreEnum(EstadoReserva, c.estado),
        motivo: c.motivo,
        usuarioId: c.usuarioId,
      })),
    };
  },

  validarModificable(reserva, accion) {
    if (!reserva) throw new NotFoundError(`Reserva no encontrada para ${accion}`);
    if (reserva.estado === EstadoReserva.CANCELADA) {
      throw new ValidationError(`No se puede ${accion} una reserva cancelada`);
    }

    const hoy = new Date();
    const inicio = new Date(reserva.fechaInicio);
    if (hoy >= inicio) {
      throw new ValidationError(`No se puede ${accion} una reserva que ya comenzó`);
    }
  },
};
