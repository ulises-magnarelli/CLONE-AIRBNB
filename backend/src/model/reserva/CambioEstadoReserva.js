export class CambioEstadoReserva {
    constructor(fecha, estadoReserva, motivo, usuario) {
        this.fecha = new Date(fecha); 
        this.estado = estadoReserva; // instancia de EstadoReserva
        this.motivo = motivo; 
        this.usuario = usuario; // instancia de Usuario que realiza el cambio
    }
}