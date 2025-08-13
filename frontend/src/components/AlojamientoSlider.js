'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchAlojamientosBackend } from '../api/api';
import AlojamientoCard from './AlojamientoCard';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

export default function AlojamientoSlider({ ciudad }) {
  const [alojamientos, setAlojamientos] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function traer() {
      try {
        const todos = await fetchAlojamientosBackend();

        console.log("→ Ciudad esperada:", ciudad);
        console.log("→ Todos los alojamientos:", todos);

        const filtrados = todos.filter((a) => {
          const nombreCiudad = a?.direccion?.ciudad?.nombre?.trim()?.toLowerCase();
          console.log(`→ Alojamiento en ciudad: ${nombreCiudad}`);
          return nombreCiudad === ciudad.toLowerCase();
        });

        
      console.log("→ Alojamiento filtrado:", filtrados);
      setAlojamientos(filtrados);
    } catch (e) {
      console.error(e);
    }
  }

  traer();
}, [ciudad]);

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({ left: dir * 300, behavior: 'smooth' });
    }
  };

  if (alojamientos.length === 0) return null;

  return (
    <section className="mb-3">
      <div className="flex items-center justify-between px-4 mb-2">
        <h2 className="text-xl font-semibold">Alojate en {ciudad}</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="bg-white rounded-full p-1 shadow">
            <ChevronLeft />
          </button>
          <button onClick={() => scroll(1)} className="bg-white rounded-full p-1 shadow">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-4 py-2 scrollbar-hide scroll-smooth"
      >
        {alojamientos.map((a) => (
          <AlojamientoCard key={a.id} alojamiento={a} />
        ))}
      </div>
    </section>
  );
}
