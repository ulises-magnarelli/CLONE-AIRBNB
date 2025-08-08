import { Box, Typography, Divider } from '@mui/material';

export default function ReseñasList({ reseñas }) {
  if (!reseñas || reseñas.length === 0) {
    return <Typography className="text-gray-500">Sin reseñas por el momento.</Typography>;
  }

  return (
    <Box className="space-y-4">
      <Typography variant="h6" className="font-semibold">Reseñas de huéspedes</Typography>
      {reseñas.map((r) => (
        <Box key={r.id} className="bg-gray-50 p-4 rounded-xl shadow-sm">
          <Typography className="font-semibold">{r.autor.nombre}</Typography>
          <Typography className="text-sm text-gray-500 mb-1">
            {new Date(r.fechaCreacion).toLocaleDateString()}
          </Typography>
          <Typography className="text-yellow-600 font-bold mb-2">⭐ {r.puntuacion.toFixed(1)}</Typography>
          <Typography>{r.comentario}</Typography>
        </Box>
      ))}
    </Box>
  );
}
