import React from "react";
import Avatar from "@/components/avatar";
import Stats from "@/components/stats";
import { motion } from "framer-motion";
import type { SeasonType, SectionsType } from "@/pages/portfolio";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import LanguageSelector from "../language-selector";
import { useTranslation } from "react-i18next";

interface Props {
  season: SeasonType;
  isModalOpen: boolean;
  handleStatClick?: (section: SectionsType) => void;
  onClickAvatar?: () => void;
}

export default function HomeSection(props: Props) {
  const { t } = useTranslation();
  const isContactAvailale = false;
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
            <Avatar
              season={props.season}
              {...(props.onClickAvatar ? { onClickAvatar: props.onClickAvatar } : {})}
            />
          </div>
        </div>

        {/* Name and Title */}
        <div className="ml-4 mr-4 mb-4 flex justify-between items-start flex-wrap gap-4">
          <div className="text-center w-full mt-5">
            <h1 className="text-4xl font-light text-gray-800 mb-1 tracking-wide">{t("name")}</h1>
            <p className="text-gray-400 text-m tracking-wider">{t("title")}</p>
          </div>
        </div>
      </div>

      <LanguageSelector />

      {/* Stats Section */}
      {(() => {
        const handle = props.handleStatClick ?? (() => undefined);
        return (
          <Stats
            options={[
              {
                label: t("projects"),
                value: "15",
                onClick: () => handle("projects"),
              },
              {
                label: t("companies"),
                value: "12",
                onClick: () => handle("companies"),
              },
              {
                label: t("leading"),
                value: "3",
                unit: t("years"),
                onClick: () => handle("leading_years"),
              },
              {
                label: t("experience"),
                value: "12",
                unit: t("years"),
                onClick: () => handle("experience_years"),
              },
            ]}
          />
        );
      })()}

      {isContactAvailale ? (
        <Button
          onClick={() => (props.handleStatClick ? props.handleStatClick("contact") : undefined)}
          className="bg-[#2D4A6B] hover:bg-[#1F3447] text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Mail className="w-4 h-4 mr-2" />
          {t("sendMessage")}
        </Button>
      ) : null}
    </motion.div>
  );
}
