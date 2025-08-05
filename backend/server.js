import express from "express";
import healthRoutes from "./src/routes/healthRoute.js";
import usuarioRoutes from "./src/routes/usuarioRoute.js";
import alojamientoRoutes from "./src/routes/alojamientoRoute.js"; 
const app = express();

app.use(express.json());
app.use(healthRoutes); // Ruta /health

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

app.use(usuarioRoutes);
app.use(alojamientoRoutes);

