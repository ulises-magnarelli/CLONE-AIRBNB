'use client';

import { useEffect, useState } from 'react';
import { fetchAlojamientosBackend } from '../../api/api';
import AlojamientoCard from '../../components/AlojamientoCard';

export default function AlojamientosPage() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function traerAlojamientos() {
      try {
        const data = await fetchAlojamientosBackend();
        setAlojamientos(data);
      } catch (error) {
        console.error("Error cargando alojamientos:", error);
      } finally {
        setLoading(false);
      }
    }

    traerAlojamientos();
  }, []);

  if (loading) return <p className="p-4">Cargando alojamientos...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Alojamientos disponibles</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {alojamientos.map((alojamiento) => (
          <AlojamientoCard key={alojamiento.id} alojamiento={alojamiento} />
        ))}
      </div>
    </div>
  );
}
