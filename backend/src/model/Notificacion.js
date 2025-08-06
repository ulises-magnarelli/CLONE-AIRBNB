import { EstadoNotificacion } from "./enums/EstadoNotificacion.js";

export class Notificacion {
  static crearNotificacionReservaCreada(reserva) {
    const mensaje = `Nueva reserva para el alojamiento "${reserva.alojamiento.nombre}"
      desde ${new Date(reserva.fechaInicio).toLocaleDateString("en-GB")}  
      hasta ${new Date(reserva.fechaFin).toLocaleDateString("en-GB")}.`;

    return {
      mensaje,
      fechaAlta: new Date(),
      estado: EstadoNotificacion.PENDIENTE,
      fechaLeida: null,
      usuario: { connect: { id: reserva.alojamiento.anfitrionId } },
    };
  }

  static crearNotificacionReservaAceptada(reserva) {
    const mensaje = `Tu reserva para el alojamiento "${reserva.alojamiento.nombre}"
      desde ${new Date(reserva.fechaInicio).toLocaleDateString("en-GB")}  
      hasta ${new Date(reserva.fechaFin).toLocaleDateString("en-GB")}
      fue aceptada por el anfitrión.`;

    return {
      mensaje,
      fechaAlta: new Date(),
      estado: EstadoNotificacion.PENDIENTE,
      fechaLeida: null,
      usuario: { connect: { id: reserva.huespedReservadorId } },
    };
  }

  static crearNotificacionReservaCancelada(reserva, motivo) {
    const mensaje = `La reserva para el alojamiento "${reserva.alojamiento.nombre}"
      desde ${new Date(reserva.fechaInicio).toLocaleDateString("en-GB")}
      hasta ${new Date(reserva.fechaFin).toLocaleDateString("en-GB")}
      fue cancelada. Motivo: ${motivo}`;

    return {
      mensaje,
      fechaAlta: new Date(),
      estado: EstadoNotificacion.PENDIENTE,
      fechaLeida: null,
      usuario: { connect: { id: reserva.alojamiento.anfitrionId } },
    };
  }
}
