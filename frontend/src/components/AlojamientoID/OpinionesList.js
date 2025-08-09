'use client';

import { Box, Grid, Typography} from '@mui/material';
import OpinionCard from './OpinionCard';

export default function OpinionesList({ opiniones }) {
  if (!opiniones || opiniones.length === 0) {
    return <Typography className="text-gray-500">Sin opiniones por el momento.</Typography>;
  }

  return (
    <Box className="space-y-6">
      <Typography variant="h5" className="font-bold">Opiniones de huéspedes</Typography>

      <Grid container spacing={8}>
        {opiniones.map((r) => (
          <Grid item xs={12} md={6} key={r.id}>
            <OpinionCard opinion={r} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}


