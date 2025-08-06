export default function FiltrosBusqueda() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      <input className="border p-2 rounded" type="text" placeholder="Ciudad" />
      <input className="border p-2 rounded" type="number" placeholder="Min. precio" />
      <input className="border p-2 rounded" type="number" placeholder="Max. precio" />
      <input className="border p-2 rounded" type="number" placeholder="Huéspedes" />
    </div>
  );
}
