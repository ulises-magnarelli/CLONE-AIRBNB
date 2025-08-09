// app/alojamientos/page.js
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

  // Tomamos filtros desde la URL
  const filtros = useMemo(() => {
    const q = searchParams.get('q') || undefined;                 // texto libre
    const ciudad = searchParams.get('ciudad') || undefined;       // compat
    const pais = searchParams.get('pais') || undefined;           // compat
    const cantHuespedes = searchParams.get('cantHuespedes') || undefined;
    const page = searchParams.get('page') || undefined;
    const fechaInicio = searchParams.get('fechaInicio') || undefined; // YYYY-MM-DD
    const fechaFin = searchParams.get('fechaFin') || undefined;       // YYYY-MM-DD

    return {
      ...(q && { q }),
      ...(ciudad && { ciudad }),
      ...(pais && { pais }),
      ...(cantHuespedes && { cantHuespedes }),
      ...(page && { page }),
      ...(fechaInicio && { fechaInicio }),
      ...(fechaFin && { fechaFin }),
    };
  }, [searchParams]);

  useEffect(() => {
    let cancelado = false;

    async function traerAlojamientos() {
      setLoading(true);
      setError('');
      try {
        // Con q: hago 2 requests (ciudad/pais) y uno resultados
        if (filtros.q?.trim()) {
          const texto = filtros.q.trim();
          const base = { ...filtros };
          delete base.q;

          const [porCiudad, porPais] = await Promise.all([
            fetchAlojamientosBackend({ ...base, ciudad: texto }),
            fetchAlojamientosBackend({ ...base, pais: texto }),
          ]);

          const map = new Map();
          [...porCiudad, ...porPais].forEach((a) => map.set(a.id, a));
          const unidos = Array.from(map.values());

          // (opcional) exact match primero
          const qLower = texto.toLowerCase();
          unidos.sort((a, b) => {
            const aCity = a?.direccion?.ciudad?.nombre?.toLowerCase() || '';
            const aPais = a?.direccion?.ciudad?.pais?.nombre?.toLowerCase() || '';
            const bCity = b?.direccion?.ciudad?.nombre?.toLowerCase() || '';
            const bPais = b?.direccion?.ciudad?.pais?.nombre?.toLowerCase() || '';
            const aExact = aCity === qLower || aPais === qLower;
            const bExact = bCity === qLower || bPais === qLower;
            if (aExact !== bExact) return aExact ? -1 : 1;
            return (a.nombre || '').localeCompare(b.nombre || '');
          });

          if (!cancelado) setAlojamientos(unidos);
          return;
        }

        // Sin q, paso los filtros tal cual
        const data = await fetchAlojamientosBackend(filtros);
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
  }, [filtros]);

  if (loading) return <p className="p-4">Cargando alojamientos...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;

  // Título amigable
  const tituloBase =
    filtros.q
      ? `Alojamientos en “${filtros.q}”`
      : filtros.ciudad
        ? `Alojamientos en ${filtros.ciudad}`
        : filtros.pais
          ? `Alojamientos en ${filtros.pais}`
          : 'Alojamientos disponibles';

  const rangoFechas =
    filtros.fechaInicio && filtros.fechaFin
      ? ` — ${filtros.fechaInicio} → ${filtros.fechaFin}`
      : filtros.fechaInicio
        ? ` — desde ${filtros.fechaInicio}`
        : filtros.fechaFin
          ? ` — hasta ${filtros.fechaFin}`
          : '';

  const titulo = `${tituloBase}${rangoFechas}`;

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
