import React from "react";

export default function Sun() {
  return (
    <div className="absolute top-20 right-24">
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] shadow-2xl animate-pulse">
        {/* Glowing effect */}
        <div className="absolute inset-0 rounded-full bg-[#FFD700] opacity-40 blur-2xl animate-pulse"></div>
      </div>
    </div>
  );
}
