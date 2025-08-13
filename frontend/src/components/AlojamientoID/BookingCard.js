"use client";
import { useState, useMemo } from "react";

export default function BookingCard({ precioPorNoche, moneda, onReserve }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");

  const canReserve = useMemo(() => {
    if (!checkIn || !checkOut) return false;
    const ini = new Date(checkIn);
    const fin = new Date(checkOut);
    return fin > ini && Number(guests) > 0;
  }, [checkIn, checkOut, guests]);

  const handleReserve = () => {
    if (!canReserve) return;
    onReserve?.({
      checkIn,
      checkOut,
      guests: Number(guests),
    });
  };

  return (
    <aside className="w-full lg:w-[420px]">
      <div className="sticky top-6">
        <div className="rounded-2xl border border-neutral-200 shadow-[0_6px_20px_rgba(0,0,0,.08)] p-5 bg-white">
          {/* Precio + por noche */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-2xl font-semibold">
              {precioPorNoche} {moneda}
            </span>
            <span className="text-neutral-600">por noche</span>
          </div>

          {/* Caja: fechas + viajeros */}
          <div className="rounded-xl overflow-hidden border border-neutral-300">
            {/* Fechas */}
            <div className="grid grid-cols-2 divide-x divide-neutral-300">
              <div className="p-3">
                <label className="block text-[11px] font-semibold tracking-wide">
                  CHECK-IN
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full outline-none text-sm pt-1"
                  aria-label="Fecha de check-in"
                />
              </div>
              <div className="p-3">
                <label className="block text-[11px] font-semibold tracking-wide">
                  CHECK-OUT
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full outline-none text-sm pt-1"
                  aria-label="Fecha de check-out"
                />
              </div>
            </div>

            {/* Viajeros */}
            <div className="p-3 border-t border-neutral-300">
              <label className="block text-[11px] font-semibold tracking-wide">
                VIAJEROS
              </label>
              <div className="relative mt-1">
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full appearance-none bg-transparent pr-8 text-sm outline-none"
                  aria-label="Cantidad de viajeros"
                >
                  {Array.from({ length: 16 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i + 1 === 1 ? "viajero" : "viajeros"}
                    </option>
                  ))}
                </select>
                {/* caret */}
                <svg
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 11.94 1.16l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.39a.75.75 0 01.02-1.18z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Botón */}
          <button
            onClick={handleReserve}
            disabled={!canReserve}
            className="mt-4 w-full rounded-xl py-3 text-white font-semibold
              bg-[#FF385C] hover:bg-[#e13053]
              disabled:opacity-50 disabled:cursor-not-allowed
              transition"
            aria-label="Reservar"
            type="button"
          >
            Reservar
          </button>

          {/* Leyenda */}
          <p className="text-center text-sm text-neutral-600 mt-3">
            No vamos a cobrarte ningún cargo por el momento
          </p>
        </div>

        {/* Enlace bajo la tarjeta */}
        <div className="mt-4">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm underline text-neutral-700 hover:text-black"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 9v4" />
              <path d="M12 17h.01" />
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Denunciar este anuncio
          </a>
        </div>
      </div>
    </aside>
  );
}
