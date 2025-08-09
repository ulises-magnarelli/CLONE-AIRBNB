'use client';

import { Box, Typography, Avatar, Button, Rating } from '@mui/material';
import { useState } from 'react';

export default function OpinionCard({ opinion }) {
  const { autor, comentario, puntuacion, fechaCreacion } = opinion;
  const fecha = new Date(fechaCreacion).toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long'
  });
  const [expandir, setExpandir] = useState(false);
  const maxLength = 220;

  const mostrarComentario =
    expandir || comentario.length <= maxLength
      ? comentario
      : comentario.slice(0, maxLength) + '...';

  const valor = typeof puntuacion === 'number' ? puntuacion : Number(puntuacion) || 0;

  return (
    <Box className="space-y-1">
      <Box className="flex items-center gap-3">
        <Avatar>{autor?.nombre?.[0] ?? '?'}</Avatar>
        <Box>
          <Typography className="font-semibold">{autor?.nombre ?? 'Usuario'}</Typography>
          <Typography className="text-sm text-gray-600">Buenos Aires, Argentina</Typography>
        </Box>
      </Box>

      <Box className="flex items-center gap-2 text-sm text-gray-600 mt-1">
        {valor > 0 ? (
          <>
            <Rating
              name={`rating-${opinion.id}`}
              value={valor}
              precision={0.5}
              readOnly
              size="small"
              aria-label={`Puntuación ${valor} de 5`}
            />
            <Typography className="text-gray-700">{valor.toFixed(1)}</Typography>
          </>
        ) : (
          <Typography className="italic">Sin puntuación</Typography>
        )}
        <Typography className="font-semibold text-black">· {fecha}</Typography>
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
