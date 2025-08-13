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
import BookingCard from '@/components/AlojamientoID/BookingCard';

export default function AlojamientoDetalle() {
  const { id } = useParams();
  const [alojamiento, setAlojamiento] = useState(null);

  const usuarioId = 4; // ⚠️ cambiar cuando tengas auth real

  useEffect(() => {
    async function cargarDatos() {
      try {
        const data = await fetchAlojamiento(id);
        setAlojamiento(data);
      } catch (error) {
        console.error('Error al cargar alojamiento', error);
      }
    }
    if (id) cargarDatos();
  }, [id]);

  if (!alojamiento) return <p className="p-4">Cargando alojamiento...</p>;

  const {
    nombre,
    descripcion,
    direccion,
    cantHuespedesMax,
    caracteristicas,
    fotos,
    opiniones,
    precioPorNoche,
    moneda,
    anfitrion,
  } = alojamiento;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <GaleriaFotos fotos={fotos} />

      <h1 className="text-3xl font-bold">{nombre}</h1>
      <p className="text-gray-600">
        {cantHuespedesMax} huéspedes · 1 dormitorio · 2 camas · 1 baño
      </p>

      {/* Resumen + Booking, lado a lado en desktop */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <ResumenAnfitrion nombre={anfitrion?.nombre} />
        </div>
        <div className="lg:col-span-1">
          <BookingCard
            precioPorNoche={precioPorNoche ?? 115}
            moneda={moneda || 'USD'}
          />
        </div>
      </section>

      <Descripcion texto={descripcion} />

      <Servicios servicios={caracteristicas} />

      {direccion && (
        <Mapa
          lat={direccion.lat}
          long={direccion.long}
          ciudad={direccion.ciudad?.nombre}
        />
      )}

      <OpinionesList opiniones={opiniones} />

      <FormOpinion
        alojamientoId={alojamiento.id}
        usuarioId={usuarioId}
        onOpinionCreada={(nuevaOpinion) => {
          setAlojamiento((prev) => ({
            ...prev,
            opiniones: [nuevaOpinion, ...(prev.opiniones || [])],
          }));
        }}
      />
    </div>
  );
}
