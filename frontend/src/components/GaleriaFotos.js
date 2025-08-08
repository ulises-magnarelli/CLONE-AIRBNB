import { Box } from '@mui/material';
import Image from 'next/image';

export default function GaleriaFotos({ fotos }) {
  return (
    <Box className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {fotos.map((foto, i) => (
        <Image
          key={i}
          src={foto.path.trim()}
          alt={foto.descripcion}
          className="w-full h-48 object-cover rounded-lg"
          width={500}
          height={300}
        />
      ))}
    </Box>
  );
}
