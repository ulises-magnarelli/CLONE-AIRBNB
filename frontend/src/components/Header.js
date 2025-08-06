'use client';

import SearchIcon from '@mui/icons-material/Search';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="text-pink-600 text-2xl font-bold">Airbnb</div>

        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-2 px-4 shadow-inner">
          <input type="text" placeholder="A cualquier lugar" className="bg-transparent outline-none text-sm w-32" />
          <input type="text" placeholder="En cualquier momento" className="bg-transparent outline-none text-sm w-40 hidden md:inline" />
          <input type="number" placeholder="¿Cuántos?" className="bg-transparent outline-none text-sm w-20 hidden md:inline" />
          <button className="bg-pink-600 text-white p-2 rounded-full text-sm ml-2">
            <SearchIcon />
          </button>
        </div>

        <div className="text-sm hidden md:block">
          <a href="#" className="hover:underline">Convertite en anfitrión</a>
        </div>
      </div>
    </header>
  );
}
