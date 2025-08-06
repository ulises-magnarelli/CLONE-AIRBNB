import { EstadoNotificacion } from "./enums/EstadoNotificacion.js";

export class Notificacion {
  static crearNotificacionReservaCreada(reserva) {
    const mensaje = `Nueva reserva para el alojamiento "${reserva.alojamiento.nombre}"
      desde ${new Date(reserva.fechaInicio).toLocaleDateString("en-GB")}  
      hasta ${new Date(reserva.fechaFin).toLocaleDateString("en-GB")},
      realizada por ${reserva.huespedReservador.nombre}.`;

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
      fue aceptada por el anfitrión ${reserva.alojamiento.anfitrion.nombre}.`;

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
      fue cancelada por el huésped ${reserva.huespedReservador.nombre}.
      Motivo: ${motivo}`;

    return {
      mensaje,
      fechaAlta: new Date(),
      estado: EstadoNotificacion.PENDIENTE,
      fechaLeida: null,
      usuario: { connect: { id: reserva.alojamiento.anfitrionId } },
    };
  }
}
