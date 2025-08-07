'use client';

import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-sm text-gray-700  mt-10">
      <div className="max-w-screen-2xl mx-auto px-6 py-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-bold mb-2">Ayuda</h3>
            <ul className="space-y-1">
              <li>Centro de ayuda</li>
              <li>Obtené ayuda con un problema de seguridad</li>
              <li>AirCover</li>
              <li>Lucha contra la discriminación</li>
              <li>Ayuda en caso de discapacidad</li>
              <li>Opciones de cancelación</li>
              <li>Problemas en tu barrio</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Cómo ser anfitrión</h3>
            <ul className="space-y-1">
              <li>Poné tu Airbnb</li>
              <li>Ofrecé tu experiencia en Airbnb</li>
              <li>Ofrecé tu servicio en Airbnb</li>
              <li>AirCover para anfitriones</li>
              <li>Recursos para anfitriones</li>
              <li>Foro de la comunidad</li>
              <li>Sé un anfitrión responsable</li>
              <li>Sumate a una clase gratuita sobre la actividad de los anfitriones</li>
              <li>Encontrá un coanfitrión</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">Airbnb</h3>
            <ul className="space-y-1">
              <li>Novedades de mayo 2025</li>
              <li>Noticias</li>
              <li>Empleo</li>
              <li>Inversionistas</li>
              <li>Estadías en Airbnb.org</li>
            </ul>
          </div>
        </div>

        <div className="border-b-gray-500 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2 flex-wrap">
            <span>© 2025 Airbnb, Inc.</span>
            <span>·</span>
            <a href="#" className="hover:underline">Privacidad</a>
            <span>·</span>
            <a href="#" className="hover:underline">Términos</a>
            <span>·</span>
            <a href="#" className="hover:underline">Mapa del sitio</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <LanguageIcon fontSize="small" />
              <span>Español (AR)</span>
            </div>
            <div className="flex items-center gap-1">
              <AttachMoneyIcon fontSize="small" />
              <span>USD</span>
            </div>
            <FacebookIcon fontSize="small" />
            <XIcon fontSize="small" />
            <InstagramIcon fontSize="small" />
          </div>
        </div>

      </div>
    </footer>
  );
}

