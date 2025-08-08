'use client';

import { useState } from 'react';
import { crearOpinionBackend } from '@/api/api'; // hay que agregarlo

export default function FormOpinion({ alojamientoId, usuarioId, onOpinionCreada }) {
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nueva = await crearOpinionBackend({
      autorId: usuarioId,
      alojamientoId,
      comentario,
      puntuacion: parseFloat(puntuacion),
    });

    if (nueva !== -1) {
      setComentario('');
      setPuntuacion(5);
      onOpinionCreada(nueva); // refresca las opiniones en pantalla
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <h2 className="text-lg font-semibold">Dejá tu opinión</h2>
      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        required
        placeholder="Escribí tu opinión..."
        className="w-full border rounded-lg p-2"
      />
      <input
        type="number"
        step="0.1"
        min="1"
        max="5"
        value={puntuacion}
        onChange={(e) => setPuntuacion(e.target.value)}
        className="w-24 border rounded p-1"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Enviar opinión
      </button>
    </form>
  );
}
