'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchAlojamientosBackend } from '../../api/api';
import AlojamientoCard from '../../components/AlojamientoCard';
import { useSearchParams } from 'next/navigation';

export default function AlojamientosPage() {
  const searchParams = useSearchParams();

  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Tomamos filtros desde la URL (solo ciudad y page por ahora)
  const filtros = useMemo(() => {
    const ciudad = searchParams.get('ciudad') || undefined;
    const page = searchParams.get('page') || undefined;
    return { ...(ciudad && { ciudad }), ...(page && { page }) };
  }, [searchParams]);

  useEffect(() => {
    let cancelado = false;
    async function traerAlojamientos() {
      setLoading(true);
      setError('');
      try {
        const data = await fetchAlojamientosBackend(filtros); // ← pasamos filtros
        if (!cancelado) setAlojamientos(data);
      } catch (e) {
        if (!cancelado) setError('No pudimos cargar los alojamientos.');
        console.error('Error cargando alojamientos:', e);
      } finally {
        if (!cancelado) setLoading(false);
      }
    }
    traerAlojamientos();
    return () => { cancelado = true; };
  }, [filtros]); // ← se reactiva cuando cambia la URL (desde el Header)

  if (loading) return <p className="p-4">Cargando alojamientos...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  const titulo =
    filtros.ciudad ? `Alojamientos en ${filtros.ciudad}` : 'Alojamientos disponibles';

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">{titulo}</h1>

      {alojamientos?.length === 0 ? (
        <p className="text-gray-600">No encontramos resultados con esos filtros.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
          {alojamientos.map((alojamiento) => (
            <AlojamientoCard key={alojamiento.id} alojamiento={alojamiento} />
          ))}
        </div>
      )}
    </div>
  );
}
