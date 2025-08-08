'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchAlojamiento } from '@/api/api';
import Mapa from '@/components/AlojamientoID/Mapa';
import Servicios from '@/components/AlojamientoID/Servicios';
import GaleriaFotos from '@/components/AlojamientoID/GaleriaFotos';
import OpinionesList from '@/components/AlojamientoID/OpinionesList';
import FormOpinion from '@/components/AlojamientoID/FormOpinion';
import ResumenAnfitrion from '@/components/AlojamientoID/ResumenAnfitrion'; 
import Descripcion from '@/components/AlojamientoID/Descripcion';

export default function AlojamientoDetalle() {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);

  const usuarioId = 4; // ⚠️ cambiar esto cuando tengas auth real

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
  } = alojamiento;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <GaleriaFotos fotos={fotos} />
      <h1 className="text-3xl font-bold">{nombre}</h1>
      <p className="text-gray-500">{cantHuespedesMax} huéspedes | 1 dormitorio | 2 camas | 1 baño</p>


      <ResumenAnfitrion nombre={alojamiento.anfitrion?.nombre} />

      <Descripcion texto={descripcion} />


      <Servicios servicios={caracteristicas} />

      
      <Mapa lat={direccion.lat} long={direccion.long} ciudad={direccion.ciudad.nombre} />
      
      <OpinionesList opiniones={alojamiento.opiniones} />

      <FormOpinion
        alojamientoId={alojamiento.id}
        usuarioId={usuarioId}
        onOpinionCreada={(nuevaOpinion) => {
          setAlojamiento((prev) => ({
            ...prev,
            opiniones: [nuevaOpinion, ...(prev.opiniones || [])]
          }));
        }}
      />

    </div>
  );
}
