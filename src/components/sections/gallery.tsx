import React from "react";
import { motion } from "framer-motion";
import Modal from "../ui/modal";

interface GalleryItem {
  title: string;
  image: string;
}

interface Props {
  title: string;
  subtitle: string;
  options: GalleryItem[];
  onClose: () => void;
}

export default function Gallery({ title, subtitle, options, onClose }: Props) {
  return (
    <Modal title={title} subtitle={subtitle} onClose={onClose} maxWidth="max-w-4xl">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pr-2">
        {options.map((design, index) => (
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
    </Modal>
  );
}
