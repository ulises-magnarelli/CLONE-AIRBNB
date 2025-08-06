'use client';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteIconOutlined from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';
import { useState } from 'react';

export default function AlojamientoCard({ alojamiento }) {
  const [favorito, setFavorito] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 relative group">
      <div className="relative w-full h-60">
        <Image
          src={alojamiento.imagen}
          alt={alojamiento.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <button
          className="absolute top-2 right-2 text-white bg-black/40 rounded-full p-1 hover:bg-black/60 transition"
          onClick={() => setFavorito(!favorito)}
        >
          {favorito ? <FavoriteIcon /> : <FavoriteIconOutlined />}
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between mb-1">
          <h2 className="text-md font-semibold truncate">{alojamiento.nombre}</h2>
          <span className="text-sm">⭐ {alojamiento.rating ?? '4.8'}</span>
        </div>
        <p className="text-sm text-gray-500 truncate">{alojamiento.ciudad}</p>
        <p className="text-sm mt-2 font-medium">${alojamiento.precioPorNoche} USD por noche</p>
      </div>
    </div>
  );
}
