import express from "express";
import cors from "cors"; // 👈 AGREGAR ESTO


import healthRoutes from "./src/routes/healthRoute.js";
import usuarioRoutes from "./src/routes/usuarioRoute.js";
import alojamientoRoutes from "./src/routes/alojamientoRoute.js"; 
import reservaRoutes from "./src/routes/reservaRoute.js";
import { registerNotificacionRoutes } from "./src/routes/notificacionRoute.js";
import opinionRoutes from './src/routes/opinionRoute.js';
import cookieParser from "cookie-parser";
import authRoute from "./src/routes/authRoute.js";


const app = express();
app.use(cors()); // 👈 AGREGAR ESTO

app.use(express.json());
app.use(cookieParser());


app.use(healthRoutes); // Ruta /health
app.use(usuarioRoutes);
app.use(alojamientoRoutes);
app.use(reservaRoutes);
app.use(opinionRoutes);
app.use(authRoute);


const getController = (ControllerClass) => new ControllerClass();
registerNotificacionRoutes(app, getController);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

