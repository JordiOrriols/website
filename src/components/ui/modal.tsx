import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export default function Modal({
  title,
  subtitle,
  onClose,
  children,
  className = "",
  maxWidth = "max-w-4xl",
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={`relative bg-white rounded-3xl shadow-2xl w-full ${maxWidth} overflow-hidden ${className}`}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
        aria-label="close"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      <div className="p-8 md:p-12">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && (
              <h2 className="text-3xl font-light text-gray-800 mb-2">{title}</h2>
            )}
            {subtitle && <p className="text-gray-500">{subtitle}</p>}
          </div>
        )}

        <div>{children}</div>
      </div>
    </motion.div>
  );
}
