'use client';

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

export default function Descripcion({ texto }) {
  const [expandido, setExpandido] = useState(false);

  const limiteCaracteres = 300; // o lo que prefieras
  const esLargo = texto.length > limiteCaracteres;

  const textoVisible = expandido || !esLargo
    ? texto
    : texto.slice(0, limiteCaracteres) + '...';

  return (
    <Box className="space-y-2 border-b pb-6">
      <Typography className="whitespace-pre-line text-gray-800">
        {textoVisible}
      </Typography>

      {esLargo && (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setExpandido((prev) => !prev)}
        >
          {expandido ? 'Mostrar menos' : 'Mostrar más'}
        </Button>
      )}
    </Box>
  );
}
