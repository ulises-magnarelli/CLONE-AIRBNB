'use client';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [cantHuespedes, setCantHuespedes] = useState(1);
  const [checkIn, setCheckIn] = useState('');   // YYYY-MM-DD
  const [checkOut, setCheckOut] = useState(''); // YYYY-MM-DD

  const handleBuscar = () => {
    const sp = new URLSearchParams();

    if (q.trim()) sp.set('q', q.trim());
    if (Number(cantHuespedes) > 0) sp.set('cantHuespedes', String(cantHuespedes));

        // validar fechas (auto‑corrige si están invertidas)
    if (checkIn && checkOut) {
      const a = new Date(checkIn), b = new Date(checkOut);
      const [ini, fin] = a <= b ? [checkIn, checkOut] : [checkOut, checkIn];
      sp.set('fechaInicio', ini);
      sp.set('fechaFin', fin);
    } else {
      if (checkIn) sp.set('fechaInicio', checkIn);
      if (checkOut) sp.set('fechaFin', checkOut);
    }

    sp.set('page', '1');
    router.push(`/alojamientos?${sp.toString()}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
      {/* barra superior */}
      <div className="mx-auto px-6 py-3 flex items-center justify-evenly">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[#FF385C]">
          <Image src="/logo.png" alt="Logo" width={55} height={55} className="rounded-md" />
          <span className="text-2xl font-semibold text-[#FF385C]">airbnb</span>
        </Link>

        {/* Tabs centrados */}
        <nav className="hidden md:flex flex-col items-center justify-center flex-1">
          <div className="flex items-center gap-10">
            <div className="flex flex-col items-center pb-1 border-b-2 border-black">
              <HomeIcon fontSize="small" />
              <span className="text-sm font-medium">Alojamientos</span>
            </div>

            <div className="flex flex-col items-center relative">
              <span className="absolute -top-2 right-0 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-md">NOVEDAD</span>
              <TravelExploreIcon fontSize="small" />
              <span className="text-sm text-gray-600">Experiencias</span>
            </div>

            <div className="flex flex-col items-center relative">
              <span className="absolute -top-2 right-0 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-md">NOVEDAD</span>
              <RoomServiceIcon fontSize="small" />
              <span className="text-sm text-gray-600">Servicios</span>
            </div>
          </div>
        </nav>

        {/* Menú derecho */}
        <div className="hidden md:flex items-center gap-5">
          <a href="#" className="text-sm hover:underline">Convertite en anfitrión</a>
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">U</div>
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center relative">
            <span className="w-1.5 h-1.5 bg-[#FF385C] rounded-full absolute top-1 right-1" />
            <span className="w-4 h-0.5 bg-gray-600 rounded-sm" />
          </div>
        </div>
      </div>

      {/* buscador tipo “píldora” */}
      <div className="mx-auto max-w-[1060px] px-6 pb-5">
        <div
          className="
            mx-auto flex items-stretch justify-between
            bg-white border border-gray-200 rounded-[40px]
            shadow-[0_10px_30px_rgba(0,0,0,0.07)]
            pl-6 pr-2 py-2
          "
        >
          {/* Lugar */}
          <div className="flex items-center gap-3 min-w-[260px] pr-4">
            <div className="flex flex-col">
              <TextField
                variant="standard"
                label="Lugar"
                placeholder="Explorar destinos"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleBuscar(); }}
                InputProps={{ disableUnderline: true }}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiInputLabel-root': {
                    fontSize: '0.78rem',
                    lineHeight: 1.2,
                    color: '#5c5c5c',
                    transform: 'translate(0, -6px) scale(1)',
                  },
                  '& .MuiInputBase-input': { fontSize: '0.95rem', padding: 0 },
                  '& .MuiInputBase-input::placeholder': { opacity: 1, color: '#9e9e9e' },
                  width: 220,
                }}
              />
            </div>
          </div>

          {/* separador */}
          <span className="self-center w-px h-10 bg-gray-200" />

{/* Check-in */}
          <div className="px-5 py-1.5 flex flex-col justify-center">
            <p className="text-xs text-[#717171] font-medium">Check-in</p>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleBuscar(); }}
              className="text-sm text-[#222] bg-transparent outline-none"
            />
          </div>

          <span className="self-center w-px h-8 bg-gray-200" />

          {/* Check-out */}
          <div className="px-5 py-1.5 flex flex-col justify-center">
            <p className="text-xs text-[#717171] font-medium">Check-out</p>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleBuscar(); }}
              className="text-sm text-[#222] bg-transparent outline-none"
            />
          </div>

          <span className="self-center w-px h-10 bg-gray-200" />

          {/* Viajeros */}
          <div className="px-6 py-2 flex flex-col justify-center min-w-[130px]">
            <p className="text-xs text-[#717171] font-medium">Viajeros</p>
            <input
              type="number"
              min={1}
              value={cantHuespedes}
              onChange={(e) => setCantHuespedes(Number(e.target.value))}
              onKeyDown={(e) => { if (e.key === 'Enter') handleBuscar(); }}
              className="text-sm text-[#222222] bg-transparent outline-none w-16"
              aria-label="Cantidad de viajeros"
            />
          </div>

          {/* Botón buscar */}
          <button
            onClick={handleBuscar}
            className="
              shrink-0 ml-2 mr-1
              grid place-items-center
              w-11 h-11 rounded-full
              bg-[#FF385C] hover:bg-[#e03151] active:scale-95
              text-white transition
            "
            aria-label="Buscar"
          >
            <SearchIcon fontSize="small" />
          </button>
        </div>
      </div>
    </header>
  );
}
