import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

const projects = [
  { title: "E-commerce Platform", image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=300&fit=crop" },
  { title: "Mobile App Design", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop" },
  { title: "Corporate Website", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
  { title: "Brand Identity", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
  { title: "Marketing Campaign", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop" },
  { title: "Dashboard UI", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
  { title: "Social Media Design", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop" },
  { title: "Product Launch", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop" }
];

export default function ProjectsGallery({ title, subtitle, onClose }) {
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
            {title}
          </h2>
          <p className="text-gray-500">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[60vh] overflow-y-auto pr-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-white font-medium">{project.title}</h3>
                  <ExternalLink className="w-4 h-4 text-white/70 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}