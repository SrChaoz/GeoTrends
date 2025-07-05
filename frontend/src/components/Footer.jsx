import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaPinterestP } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      {/* Border superior */}
      <div className="border-t border-yellow-500">
        <div className="max-w-full mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400 text-sm">
          {/* Columna 1 */}
          <div className="space-y-4">
            <p>GeoTrends © 2025.</p>
            <p>Esta plataforma utiliza datos proporcionados por servicios externos como la página de Google Trends.</p>
          </div>
          {/* Columna 2 */}
          <div className="space-y-4">
            <p>Al utilizar esta herramienta, aceptas nuestros términos de uso y política de privacidad.</p>
            <p>GeoTrends es un proyecto académico desarrollado por estudiantes del cuarto semestre de Análisis y Modelado de Software – PAO 2025-01.</p>
          </div>
          {/* Columna 3: Link y redes */}
          <div className="flex flex-col items-start md:items-end space-y-4">
            <a href="/acerca" className="text-yellow-500 hover:underline font-medium">
              Acerca de
            </a>
            <div className="bg-yellow-500 rounded-full p-2 flex space-x-4">
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="text-white w-5 h-5" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-white w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-white w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn className="text-white w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="text-white w-5 h-5" />
              </a>
              <a href="#" aria-label="Pinterest">
                <FaPinterestP className="text-white w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Border inferior */}
      <div className="border-t border-yellow-500" />
    </footer>
  )
}
