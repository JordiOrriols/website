import React from 'react';

export default function Avatar() {
  return (
    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FDD8B5] to-[#F5CBA7] flex items-center justify-center overflow-hidden relative">
      {/* Cabello */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-20 bg-[#3D2817] rounded-t-full"></div>
      <div className="absolute top-6 left-3 w-12 h-16 bg-[#3D2817] rounded-full transform -rotate-12"></div>
      <div className="absolute top-6 right-3 w-12 h-16 bg-[#3D2817] rounded-full transform rotate-12"></div>
      
      {/* Cara */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-24 h-28 bg-gradient-to-b from-[#FDD8B5] to-[#F5CBA7] rounded-full">
        {/* Ojos */}
        <div className="absolute top-10 left-4 flex gap-8">
          <div className="relative">
            {/* Ojo izquierdo */}
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-[#4A3728] rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            {/* Ceja */}
            <div className="absolute -top-2 left-0 w-6 h-1.5 bg-[#3D2817] rounded-full transform -rotate-6"></div>
          </div>
          
          <div className="relative">
            {/* Ojo derecho */}
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-[#4A3728] rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            {/* Ceja */}
            <div className="absolute -top-2 left-0 w-6 h-1.5 bg-[#3D2817] rounded-full transform rotate-6"></div>
          </div>
        </div>
        
        {/* Nariz */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-[#F5CBA7] rounded-b-full"></div>
        
        {/* Sonrisa */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-12 h-4 border-b-2 border-[#3D2817] rounded-b-full"></div>
      </div>
      
      {/* Barba */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-20 h-16">
        {/* Parte inferior de la barba */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-[#3D2817] rounded-b-full"></div>
        {/* Laterales de la barba */}
        <div className="absolute bottom-2 left-0 w-8 h-10 bg-[#3D2817] rounded-l-full"></div>
        <div className="absolute bottom-2 right-0 w-8 h-10 bg-[#3D2817] rounded-r-full"></div>
        {/* Bigote */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-14 h-4 bg-[#3D2817] rounded-full"></div>
      </div>
      
      {/* Cuello y hombros */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-12 bg-[#2D4A6B] rounded-t-3xl"></div>
    </div>
  );
}