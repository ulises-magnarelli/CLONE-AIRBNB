import { Box, Typography } from '@mui/material';
import KeyIcon from '@mui/icons-material/VpnKey';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ChatIcon from '@mui/icons-material/Chat';
import Avatar from '@mui/material/Avatar';

export default function ResumenAnfitrion({ nombre }) {
  return (
    <Box className="border-t pt-6 space-y-4">
      <Box className="flex items-center gap-4">
        <Avatar sx={{ width: 48, height: 48 }}>
        {nombre?.charAt(0).toUpperCase() ?? '?'}
        </Avatar>
        <Box>
          <Typography className="font-semibold">Anfitrión: {nombre}</Typography>
          <Typography className="text-gray-500 text-sm">5 años como anfitrión</Typography>
        </Box>
      </Box>

      <Box className="space-y-3 pt-4">
        <Box className="flex gap-3">
          <KeyIcon className="text-gray-700" />
          <Box>
            <Typography className="font-semibold">Experiencia de check-in fantástica</Typography>
            <Typography className="text-sm text-gray-600">
              A los últimos huéspedes les encantó lo bien que empezó su estadía.
            </Typography>
          </Box>
        </Box>

        <Box className="flex gap-3">
          <LocalParkingIcon className="text-gray-700" />
          <Box>
            <Typography className="font-semibold">Estacioná gratis</Typography>
            <Typography className="text-sm text-gray-600">
              Este es uno de los pocos lugares en la zona con estacionamiento gratuito.
            </Typography>
          </Box>
        </Box>

        <Box className="flex gap-3">
          <ChatIcon className="text-gray-700" />
          <Box>
            <Typography className="font-semibold">Excelente comunicación con el anfitrión</Typography>
            <Typography className="text-sm text-gray-600">
              A los últimos huéspedes les encantó la comunicación con {nombre}.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
