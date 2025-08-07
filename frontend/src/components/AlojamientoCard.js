'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';
import { useState } from 'react';

export default function AlojamientoCard({ alojamiento }) {
  const [favorito, setFavorito] = useState(false);
  const imagenUrl = alojamiento.fotos?.[0]?.path?.trim();

  return (
    <div className="min-w-[270px] max-w-[270px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative group">
      <div className="relative w-full h-[220px] bg-gray-100 rounded-xl overflow-hidden">

        {/* Imagen */}
        {imagenUrl ? (
          <Image
            src={imagenUrl}
            alt={alojamiento.nombre}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
            Sin imagen
          </div>
        )}

        {/* Burbuja "Favorito entre huéspedes" + ícono */}
        <div className="absolute top-2 right-2 bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1 shadow text-xs text-gray-800 font-medium">
          <span>Favorito entre huéspedes</span>
          <button
            className="text-red-500 hover:text-red-600 transition"
            onClick={() => setFavorito(!favorito)}
          >
            {favorito ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon className="text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Info del alojamiento */}
      <div className="p-3">
        <h2 className="text-sm font-semibold truncate">{alojamiento.nombre}</h2>
        <p className="text-xs text-gray-500 truncate">{alojamiento.direccion?.ciudad?.nombre}</p>
        <p className="text-xs mt-1 text-gray-800">
          ${alojamiento.precioPorNoche} USD por noche
        </p>
        <p className="text-xs">⭐ {alojamiento.rating ?? '4.8'}</p>
      </div>
    </div>
  );
}
