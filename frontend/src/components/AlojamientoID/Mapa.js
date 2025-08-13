import { Box, Typography } from '@mui/material';

export default function Mapa({ lat, long, ciudad }) {
  const url = `https://maps.google.com/maps?q=${lat},${long}&z=15&output=embed`;
  return (
    <Box className="mt-4">
      <Typography variant="h6" className="font-semibold mb-2">
        ¿Dónde vas a estar?
      </Typography>
      <Typography className="text-sm mb-2 text-gray-600">{ciudad}</Typography>
      <iframe
        src={url}
        width="100%"
        height="300"
        loading="lazy"
        className="rounded-2xl"
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
}
