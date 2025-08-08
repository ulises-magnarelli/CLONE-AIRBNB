'use client';

import { Box, Grid, Typography, Avatar, Button } from '@mui/material';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';

export default function OpinionesList({ opiniones }) {
  if (!opiniones || opiniones.length === 0) {
    return <Typography className="text-gray-500">Sin opiniones por el momento.</Typography>;
  }

  return (
    <Box className="space-y-6">
      <Typography variant="h5" className="font-bold">Opiniones de huéspedes</Typography>

      <Grid container spacing={4}>
        {opiniones.map((r) => (
          <Grid item xs={12} md={6} key={r.id}>
            <OpinionCard opinion={r} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

function OpinionCard({ opinion }) {
  const { autor, comentario, puntuacion, fechaCreacion } = opinion;
  const fecha = new Date(fechaCreacion).toLocaleDateString('es-AR', { year: 'numeric', month: 'long' });
  const [expandir, setExpandir] = useState(false);
  const maxLength = 220;

  const mostrarComentario = expandir || comentario.length <= maxLength
    ? comentario
    : comentario.slice(0, maxLength) + '...';

  return (
    <Box className="space-y-1">
      <Box className="flex items-center gap-3">
        <Avatar>{autor.nombre[0]}</Avatar>
        <Box>
          <Typography className="font-semibold">{autor.nombre}</Typography>
          <Typography className="text-sm text-gray-600">Buenos Aires, Argentina</Typography>
        </Box>
      </Box>

      <Box className="flex items-center gap-2 text-sm text-gray-600 mt-1">
        <StarIcon fontSize="small" className="text-black" />
        <Typography className="font-semibold text-black">{fecha}</Typography>
        <Typography>· Estadía de algunas noches</Typography>
      </Box>

      <Typography className="mt-1">{mostrarComentario}</Typography>

      {comentario.length > maxLength && (
        <Button onClick={() => setExpandir(!expandir)} size="small">
          {expandir ? 'Mostrar menos' : 'Mostrar más'}
        </Button>
      )}
    </Box>
  );
}
