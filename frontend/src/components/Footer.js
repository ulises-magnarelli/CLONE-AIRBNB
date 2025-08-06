export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8  pt-6">
        <div>
          <h4 className="font-semibold mb-2">Ayuda</h4>
          <ul className="space-y-1">
            <li>Centro de ayuda</li>
            <li>Seguridad</li>
            <li>AirCover</li>
            <li>Discriminación</li>
            <li>Accesibilidad</li>
            <li>Cancelación</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Cómo ser anfitrión</h4>
          <ul className="space-y-1">
            <li>Poné tu Birbnb</li>
            <li>Ofrecé experiencia</li>
            <li>Foro de la comunidad</li>
            <li>AirCover para anfitriones</li>
            <li>Sé un anfitrión responsable</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Birbnb</h4>
          <ul className="space-y-1">
            <li>Novedades</li>
            <li>Empleo</li>
            <li>Inversionistas</li>
            <li>Estadías.org</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © 2025 Birbnb, Inc. · Privacidad · Términos · Mapa del sitio
      </div>
    </footer>
  );
}
