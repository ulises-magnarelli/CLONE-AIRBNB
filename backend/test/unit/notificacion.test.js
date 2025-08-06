
import { Notificacion } from '../../src/model/Notificacion.js'
import { EstadoNotificacion } from '../../src/model/enums/EstadoNotificacion';

const hoy = new Date();
const hoyFormatted = hoy.toLocaleDateString('en-GB');

describe("Notificacion", () => {
    const mockReserva = {
        fechaAlta: hoy,
        fechaInicio: hoy,
        fechaFin: hoy,
        huespedReservador: { nombre: "huespedTest" },
        cantidadHuespedes: 4,
        alojamiento: {
            nombre: "alojamientoTest",
            anfitrion: { nombre: "anfitrionTest" }
        },
        precioPorNoche: 100,
        historialDeCambios: []
    };

    function contieneAlojamientoYFechas(notificacion) {
        expect(notificacion.mensaje).toContain("alojamientoTest");
        expect(notificacion.mensaje).toContain(hoyFormatted);
        expect(notificacion.mensaje).toContain(hoyFormatted);
    }

    function seCreaConEstadoNoLeida(notificacion) {
        expect(notificacion.estado).toBe(EstadoNotificacion.PENDIENTE)
    }
    
    test("Crea notificacion de reserva creada", () => {
        const notificacion = Notificacion.crearNotificacionReservaCreada(mockReserva);
        
        seCreaConEstadoNoLeida(notificacion);
        expect(notificacion.mensaje).toContain("Nueva reserva para");
        contieneAlojamientoYFechas(notificacion);
        expect(notificacion.mensaje).toContain("huespedTest");
    })

    test("Crea notificacion de reserva aceptada", () => {
        const notificacion = Notificacion.crearNotificacionReservaAceptada(mockReserva);
        
        seCreaConEstadoNoLeida(notificacion);
        expect(notificacion.mensaje).toContain("fue aceptada");
        contieneAlojamientoYFechas(notificacion);
        expect(notificacion.mensaje).toContain("anfitrionTest");
    })

    test("Crea notificacion de reserva cancelada", () => {
        const notificacion = Notificacion.crearNotificacionReservaCancelada(mockReserva);
        
        seCreaConEstadoNoLeida(notificacion);
        expect(notificacion.mensaje).toContain("fue cancelada");
        contieneAlojamientoYFechas(notificacion);
        expect(notificacion.mensaje).toContain("huespedTest");
    })
})