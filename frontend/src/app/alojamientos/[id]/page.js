'use client';

import { useEffect, useState } from 'react';
import  {useRouter, useParams} from 'next/navigation';
import { fetchAlojamiento } from '@/api/api';
import Mapa from '@/components/Mapa';
import Servicios from '@/components/Servicios';
import Calificaciones from '@/components/Calificaciones';
import GaleriaFotos from '@/components/GaleriaFotos';

export default function AlojamientoDetalle() {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      try {
        const data = await fetchAlojamiento(id);
        setAlojamiento(data);
      } catch (error) {
        console.error('Error al cargar alojamiento', error);
      }
    }

    cargarDatos();
  }, [id]);

  if (!alojamiento) return <p className="p-4">Cargando alojamiento...</p>;

  const {
    nombre,
    descripcion,
    direccion,
    cantHuespedesMax,
    caracteristicas,
    fotos,
    calificaciones,
    camas,
  } = alojamiento;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <h1 className="text-3xl font-bold">{nombre}</h1>
      <p className="text-gray-600">{descripcion}</p>

      <GaleriaFotos fotos={fotos} />

      <section>
        <h2 className="text-xl font-semibold">¿Dónde vas a dormir?</h2>
        <div className="flex gap-4 mt-2">
            Living
        </div>

        <div className="flex gap-4 mt-2">
            Dormitorio
        </div>
   
      </section>

      <Servicios servicios={caracteristicas} />

      <Calificaciones datos={calificaciones} />

      <Mapa lat={direccion.lat} long={direccion.long} ciudad={direccion.ciudad.nombre} />

      {/* TODO: ReservaWidget */}
    </div>
  );
}
