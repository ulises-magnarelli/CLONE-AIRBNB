'use client';

import { useState, useEffect } from 'react';
import FiltrosBusqueda from '@/components/FiltrosBusqueda';
import AlojamientoCard from '@/components/AlojamientoCard';

const alojamientosMock = [
  {
    id: 1,
    nombre: 'Casa en la Playa',
    ciudad: 'Mar del Plata',
    precioPorNoche: 120,
    capacidad: 4,
    wifi: true,
    mascotas: false,
    imagen: 'https://images.unsplash.com/photo-1615571022219-eb45cf7faa9d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    nombre: 'Cabaña en el bosque',
    ciudad: 'Bariloche',
    precioPorNoche: 80,
    capacidad: 2,
    wifi: false,
    mascotas: true,
    imagen: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function BusquedaAlojamientosPage() {
  const [alojamientos, setAlojamientos] = useState([]);

  useEffect(() => {
    // Simulamos carga inicial con mock
    setAlojamientos(alojamientosMock);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Buscar alojamientos</h1>
      <FiltrosBusqueda />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-6">
        {alojamientos.map((aloj) => (
          <AlojamientoCard key={aloj.id} alojamiento={aloj} />
        ))}
      </div>
    </main>
  );
}
