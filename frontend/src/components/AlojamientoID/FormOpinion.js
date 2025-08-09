'use client';

import { useState } from 'react';
import { crearOpinionBackend } from '@/api/api'; // hay que agregarlo
import { Rating } from '@mui/material';

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
        placeholder="Escribí tu opinión...(esto despues lo podria poner solo para los usuarios que se hayan alojado)"
        className="w-full border rounded-lg p-2"
      />
     <div>
        <Rating
          name="puntuacion"
          value={puntuacion}
          precision={0.5}
          onChange={(_, newValue) => {
            if (newValue !== null) setPuntuacion(newValue);
          }}
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Enviar opinión
      </button>
    </form>
  );
}
