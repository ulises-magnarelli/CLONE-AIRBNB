import express from "express";
import healthRoutes from "./src/routes/healthRoute.js";

const app = express();

app.use(express.json());
app.use(healthRoutes); // Ruta /health

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
