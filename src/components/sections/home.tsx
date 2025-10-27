import React from "react";
import Avatar from "@/components/avatar";
import Stats from "@/components/stats";
import { motion } from "framer-motion";
import { SectionsType } from "@/pages/portfolio";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface Props {
  isModalOpen: boolean;
  handleStatClick?: (section: SectionsType) => void;
}

export default function HomeSection(props: Props) {
  return (
    <motion.div
      animate={
        props.isModalOpen
          ? {
              scale: 0.95,
              opacity: 0.3,
              z: -100,
              rotateX: 5,
            }
          : {
              scale: 1,
              opacity: 1,
              z: 0,
              rotateX: 0,
            }
      }
      transition={{
        type: "spring",
        damping: 25,
        stiffness: 200,
      }}
      className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full overflow-visible"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative pt-20 px-8">
        {/* Avatar */}
        <div className="mt-[-200px]">
          <div className="w-40 h-40 rounded-full bg-white p-2 shadow-xl m-auto">
            <Avatar />
          </div>
        </div>

        {/* Name and Title */}
        <div className="ml-4 mr-4 mb-4 flex justify-between items-start flex-wrap gap-4">
          <div className="text-center w-full mt-5">
            <h1 className="text-4xl font-light text-gray-800 mb-1 tracking-wide">
              Jordi Orriols
            </h1>
            <p className="text-gray-400 text-m tracking-wider">
              Multimedia Engineer Lead
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <Stats
        options={[
          {
            label: "Projects",
            value: "15",
            onClick: () => props.handleStatClick("projects"),
          },
          {
            label: "Companies",
            value: "12",
            onClick: () => props.handleStatClick("companies"),
          },
          {
            label: "Leading",
            value: "3",
            unit: "years",
            onClick: () => props.handleStatClick("leading_years"),
          },
          {
            label: "Experience",
            value: "12",
            unit: "years",
            onClick: () => props.handleStatClick("experience_years"),
          },
        ]}
      />
      {false ? (
        <Button
          onClick={() => props.handleStatClick("contact")}
          className="bg-[#2D4A6B] hover:bg-[#1F3447] text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Mail className="w-4 h-4 mr-2" />
          Enviar mensaje
        </Button>
      ) : null}
    </motion.div>
  );
}
