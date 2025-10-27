import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Globe } from 'lucide-react';

const websites = [
  { year: "2024", title: "Tech Startup Platform", description: "Plataforma completa con panel de administración", tech: "React, Node.js" },
  { year: "2024", title: "E-commerce Fashion", description: "Tienda online con sistema de pagos integrado", tech: "Next.js, Stripe" },
  { year: "2023", title: "Healthcare Portal", description: "Portal de salud con sistema de citas", tech: "Vue.js, Laravel" },
  { year: "2023", title: "Real Estate Platform", description: "Portal inmobiliario con búsqueda avanzada", tech: "React, MongoDB" },
  { year: "2023", title: "Educational Platform", description: "Plataforma de cursos online", tech: "Angular, Firebase" },
  { year: "2022", title: "Restaurant Chain Website", description: "Sitio corporativo con reservas online", tech: "WordPress, PHP" },
  { year: "2022", title: "Financial Dashboard", description: "Dashboard financiero en tiempo real", tech: "React, D3.js" },
  { year: "2022", title: "Travel Booking Site", description: "Sistema de reservas de viajes", tech: "Vue.js, Express" }
];

export default function WebsitesTimeline({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      <div className="p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-3xl font-light text-gray-800 mb-2">
            Sitios Web
          </h2>
          <p className="text-gray-500">
            Timeline de desarrollo web
          </p>
        </div>

        <div className="relative max-h-[60vh] overflow-y-auto pr-2">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2D4A6B] to-transparent"></div>
          
          <div className="space-y-8">
            {websites.map((site, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="relative pl-20"
              >
                <div className="absolute left-5 top-2 w-6 h-6 bg-[#2D4A6B] rounded-full border-4 border-white shadow-md flex items-center justify-center">
                  <Globe className="w-3 h-3 text-white" />
                </div>
                
                <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-[#2D4A6B]">{site.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{site.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{site.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {site.tech.split(', ').map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}