'use client';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

export default function AlojamientoCard({ alojamiento }) {
  const [favorito, setFavorito] = useState(false);
  const imagenUrl = alojamiento.fotos?.[0]?.path?.trim();

  return (
    <Link target='_blank' href={`/alojamientos/${alojamiento.id}`}>
      <div className="
          w-[180px] min-w-[180px] max-w-[180px]
          bg-white rounded-2xl overflow-hidden
          shadow-sm hover:shadow-md transition-all duration-300 relative group
        ">
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden">

          {/* Imagen */}
          {imagenUrl ? (
            <Image
              src={imagenUrl}
              alt={alojamiento.nombre}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 45vw, 220px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
              Sin imagen
            </div>
          )}

          {/* Burbuja "Favorito entre huéspedes" + ícono */}
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full px-2.5 py-1 flex items-center gap-1 shadow text-[11px] text-gray-800 font-medium">
            <span className="hidden md:inline">Favorito entre huéspedes</span>
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


        {/* Info compacta */}
        <div className="p-2.5">
          <h2 className="text-[13px] font-semibold truncate">{alojamiento.nombre}</h2>
          <p className="text-[12px] text-gray-500 truncate">
            {alojamiento.direccion?.ciudad?.nombre}
          </p>

          <div className="mt-1 flex items-center justify-between">
            <p className="text-[12px] text-gray-800">
              ${alojamiento.precioPorNoche} <span className="text-gray-500">USD por noche</span>
            </p>
            <p className="text-[12px]">⭐ {alojamiento.rating ?? '4.8'}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
