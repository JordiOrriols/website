import React from "react";
import Avatar from "@/components/avatar";
import Stats from "@/components/stats";
import { motion } from "framer-motion";
import type { SeasonType, SectionsType } from "@/pages/portfolio";
import type { ExperienceEntry } from "@/data/experience";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import LanguageSelector from "../language-selector";
import { useTranslation } from "react-i18next";
import Card from "@/components/ui/card";
import { calculateLeadingYears, calculateTotalExperienceYears } from "@/lib/experience";

interface Props {
  season: SeasonType;
  showPlane?: boolean;
  isModalOpen: boolean;
  handleStatClick?: (section: SectionsType) => void;
  onClickAvatar?: () => void;
}

export default function HomeSection(props: Props) {
  const { t } = useTranslation();
  const isContactAvailale = false;
  const experienceTimeline = t("experienceTimeline", { returnObjects: true }) as ExperienceEntry[];
  const leadingYears = calculateLeadingYears(experienceTimeline);
  const experienceYears = calculateTotalExperienceYears(experienceTimeline);
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
      style={{ transformStyle: "preserve-3d" }}
      data-testid="home-section"
    >
      <Card className="relative overflow-visible">
        <div className="relative pt-20 px-8">
          {/* Avatar */}
          <div className="mt-[-200px]">
            <div className="w-40 h-40 rounded-full bg-white p-2 shadow-xl m-auto">
              <Avatar
                season={props.showPlane ? "aviator" : props.season}
                {...(props.onClickAvatar ? { onClickAvatar: props.onClickAvatar } : {})}
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="ml-4 mr-4 mb-4 flex justify-between items-start flex-wrap gap-4">
            <div className="text-center w-full mt-5" data-testid="profile-info">
              <h1
                className="text-4xl font-light text-gray-800 mb-1 tracking-wide"
                data-testid="profile-name"
              >
                {t("name")}
              </h1>
              <p className="text-gray-400 text-m tracking-wider" data-testid="profile-title">
                {t("title")}
              </p>
              <p
                className="text-gray-600 text-sm md:text-base mt-4 max-w-xl mx-auto"
                data-testid="profile-value-statement"
              >
                {t("valueStatement")}
              </p>
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
                  disabled: true,
                  onClick: () => undefined,
                },
                {
                  label: t("companies"),
                  value: "12",
                  onClick: () => handle("companies"),
                },
                {
                  label: t("leading"),
                  value: String(leadingYears),
                  unit: t("years"),
                  disabled: true,
                  onClick: () => undefined,
                },
                {
                  label: t("experience"),
                  value: String(experienceYears),
                  unit: t("years"),
                  onClick: () => handle("experience_years"),
                },
              ]}
            />
          );
        })()}

        {isContactAvailale && (
          <Button
            onClick={() => props.handleStatClick?.("contact")}
            className="bg-[#2D4A6B] hover:bg-[#1F3447] text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
          >
            <Mail className="w-4 h-4 mr-2" />
            {t("sendMessage")}
          </Button>
        )}
      </Card>
    </motion.div>
  );
}
