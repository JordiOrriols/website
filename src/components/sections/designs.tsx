import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const designs = [
  { title: "Logo Design", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop" },
  { title: "Poster Campaign", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop" },
  { title: "UI Kit", image: "https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=400&h=300&fit=crop" },
  { title: "Brochure Design", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop" },
  { title: "Icon Set", image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop" },
  { title: "Packaging", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop" },
  { title: "Typography", image: "https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=400&h=300&fit=crop" },
  { title: "Illustration", image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?w=400&h=300&fit=crop" }
];

export default function DesignsGallery({ onClose }) {
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
            Mis Diseños
          </h2>
          <p className="text-gray-500">
            Trabajos creativos y visuales
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {designs.map((design, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square"
            >
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white font-medium text-center px-2">{design.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}