'use client';

import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Header() {

  const [ciudad, setCiudad] = useState('');
  const router = useRouter();

  const handleBuscar = () => {
    const q = ciudad?.trim();
    if (!q) return;
    router.push(`/alojamientos?ciudad=${encodeURIComponent(q)}&page=1`);
  };
  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <div className="text-pink-600 text-2xl font-bold">airbnb</div>

        <section className="flex flex-col items-center justify-center flex-1 gap-2 mb-3">
          {/* Tabs */}
          <div className="flex items-center gap-6 ml-6 mb-3">
            <div className="flex flex-col items-center border-b-2 border-black pb-1">
              <HomeIcon fontSize="small" />
              <span className="text-sm font-medium">Alojamientos</span>
            </div>
            <div className="flex flex-col items-center relative">
              <div className="absolute -top-2 right-0">
                <FiberNewIcon fontSize="small" color="primary" />
              </div>
              <TravelExploreIcon fontSize="small" />
              <span className="text-sm text-gray-600">Experiencias</span>
            </div>
            <div className="flex flex-col items-center relative">
              <div className="absolute -top-2 right-0">
                <FiberNewIcon fontSize="small" color="primary" />
              </div>
              <RoomServiceIcon fontSize="small" />
              <span className="text-sm text-gray-600">Servicios</span>
            </div>
          </div>

          {/* Search Box */}
          <div className="flex items-center bg-white rounded-full shadow-[0px_4px_12px_rgba(0,0,0,0.1)] overflow-hidden flex-1 max-w-4xl border border-gray-200">
            <div className="px-4 py-2 border-r border-gray-300 flex items-center">
              <TextField
                variant="standard"
                label="Lugar"
                placeholder="Explorar destinos"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleBuscar(); }}
                InputProps={{ disableUnderline: true }}
                sx={{ '& .MuiInputBase-input': { fontSize: '0.9rem', padding: 0 }, width: '140px' }}
              />
            </div>

            <div className="px-6 py-3 border-r border-gray-300">
              <p className="text-xs text-[#717171] font-medium">Check-in</p>
              <p className="text-sm text-[#222222]">¿Cuándo?</p>
            </div>
            <div className="px-6 py-3 border-r border-gray-300">
              <p className="text-xs text-[#717171] font-medium">Check-out</p>
              <p className="text-sm text-[#222222]">¿Cuándo?</p>
            </div>
            <div className="px-6 py-3 flex-1">
              <p className="text-xs text-[#717171] font-medium">Viajeros</p>
              <p className="text-sm text-[#222222]">¿Cuántos?</p>


            </div>
            <button
              onClick={handleBuscar}
              className="bg-[#FF385C] hover:bg-[#e03151] text-white p-3 rounded-full m-2 transition"
              aria-label="Buscar"
            >
              <SearchIcon />
            </button>
          </div>
        </section>

        {/* Right Menu */}
        <div className="flex items-center gap-4 ml-6">
          <a href="#" className="text-sm hover:underline">Convertite en anfitrión</a>
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">U</div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center relative">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full absolute top-1 right-1"></div>
            <div className="w-4 h-0.5 bg-gray-600 rounded-sm"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
