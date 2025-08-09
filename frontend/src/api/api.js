import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";





// Fetch Alojamientos 
export const fetchAlojamientosBackend = async (filtros = {}) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
  const url = new URL(`${API_BASE_URL}/alojamientos`);

  Object.keys(filtros).forEach(key => {
    const value = filtros[key];
    if (value == null || value === '') return; // limpia vacíos

    if (key === "caracteristicas" && Array.isArray(value)) {
      value.forEach((caract) => url.searchParams.append("caracteristicas", caract));
      return;
    }

    if (key === "fechaInicio" || key === "fechaFin") {
      // Aceptar Date o string (YYYY-MM-DD)
      let toSend;
      if (value instanceof Date) {
        toSend = value.toISOString().split('T')[0];
      } else if (typeof value === 'string') {
        // si viene "YYYY-MM-DD" lo mando tal cual
        toSend = value;
      } else {
        // último intento: intentar parsear
        const d = new Date(value);
        toSend = isNaN(d) ? undefined : d.toISOString().split('T')[0];
      }
      if (toSend) url.searchParams.append(key, toSend);
      return;
    }

    url.searchParams.append(key, value);
  });

  url.searchParams.append("limit", "100");

  try {
    const { data } = await axios.get(url.toString());
    return data;
  } catch (error) {
    console.error("Error fetching alojamientos:", error);
    throw error;
  }
};





// Fetch Alojamiento por ID
export const fetchAlojamiento = async (id) => {
  const url = new URL(`${API_BASE_URL}/alojamientos`);
  try {
    const response = await axios.get(`${url.toString()}/${id}`);
    console.log("Request completo a backend:", url.toString(), response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching alojamientos:", error);
    throw error;
  }
};


export const crearOpinionBackend = async (opinion) => {
  const url = `${API_BASE_URL}/opiniones`;
  try {
    const response = await axios.post(url, opinion);
    return response.data;
  } catch (error) {
    console.error("Error al crear opinión:", error);
    return -1;
  }
};
// export const fetchReservasDeUsuarioBackend = async (id) => {
//   const url = new URL(`${API_BASE_URL}/reservas`);
//   url.searchParams.append("id", id);

//   try {
//     const response = await axios.get(url.toString());
//     console.log("Request completo a backend:", url.toString(), response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching reservas:", error);
//     throw error;
//   }
// }

// export const fetchNotificacionesDeUsuarioBackend = async (id) => {
//   const url = new URL(`${API_BASE_URL}/notificaciones`);
//   url.searchParams.append("destinatario", id);

//   try {
//     const response = await axios.get(url.toString());
//     console.log("Request completo a backend:", url.toString(), response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching notificaciones:", error);
//     throw error;
//   }
// };

// export const MarcarComoLeidaBackend = async (id) => {
//   const url = `${API_BASE_URL}/notificaciones/${id}`;
//   try {
//     const response = await axios.patch(url);
//     console.log("Request completo a backend:", url, response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error marking notification as read:", error);
//     throw error;
//   }
// };


// export const crearReservaBackend = async (datosReserva) => {
//   const url = `${API_BASE_URL}/reservas`;
//   try {
//     const response = await axios.post(url, datosReserva);
//     console.log("Reserva creada:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("POST falló:", error.response?.data || error);
//     return -1
//   }
// };

// export const aceptarReservaBackend = async (idReserva) => {
//   const url = `${API_BASE_URL}/reservas/${idReserva}`;
//   try {
//     const response = await axios.patch(url, {
//     "estado" : "ACEPTADA"
//   });
//     console.log("Reserva aceptada:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("PATCH falló:", error.response?.data || error);
//     return -1;
//   }
// }

// export const cancelarReservaBackend = async (idReserva) => {
//   const url = `${API_BASE_URL}/reservas/${idReserva}`;
//   try {
//     const response = await axios.patch(url, {
//     "estado" : "CANCELADA"
//   });
//     console.log("Reserva aceptada:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("PATCH falló:", error.response?.data || error);
//     return -1;
//   }
// }

// export const crearAlojamientoBackend = async (alojamiento) => {
//   const url = `${API_BASE_URL}/alojamientos`;
//   try {
//     const response = await axios.post(url, alojamiento);
//     console.log("Alojamiento creado:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("POST falló:", error.response?.data || error);
//     return -1;
//   }
// };

