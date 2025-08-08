import { Typography, Box } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import KitchenIcon from '@mui/icons-material/Kitchen';
// import más íconos si querés

const iconMap = {
  wifi: <WifiIcon />,
  cocina: <KitchenIcon />,
  // Agregá más si tenés nombres fijos
};

export default function Servicios({ servicios }) {
  return (
    <Box>
      <Typography variant="h6" className="font-semibold mb-2">
        ¿Qué ofrece este lugar?
      </Typography>
      <Box className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {servicios.map((s, i) => (
          <Box key={i} className="flex items-center gap-2">
            {iconMap[s.nombre.toLowerCase()] || <span>🔹</span>}
            <Typography>{s.nombre}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
