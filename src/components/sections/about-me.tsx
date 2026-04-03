import React from "react";
import { useTranslation } from "react-i18next";
import { MapPin, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Card from "@/components/ui/card";
import ImageWithFallback from "@/components/ui/image-with-fallback";

export default function AboutMe() {
  const { t } = useTranslation();

  const highlights = t("aboutMeHighlights", { returnObjects: true }) as string[];

  return (
    <Card data-testid="about-me-section">
      <div className="p-8 md:p-12">
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("aboutMeLabel")}
        </span>
        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mt-2 mb-8">
          {t("aboutMeTitle")}
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg shrink-0 mx-auto md:mx-0">
            <ImageWithFallback
              src="/images/image.jpeg"
              alt={t("aboutMeLabel")}
              className="w-full h-full object-cover"
              data-testid="about-me-photo"
            />
          </div>

          <div className="flex-1 space-y-4">
            <p className="text-gray-600 leading-relaxed">{t("aboutMeDescription1")}</p>
            <p className="text-gray-600 leading-relaxed">{t("aboutMeDescription2")}</p>

            <div
              className="flex items-center gap-2 text-gray-500 mt-4"
              data-testid="about-me-location"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span className="text-sm">{t("aboutMeLocation")}</span>
            </div>

            <motion.ul
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-center gap-2 text-gray-700 text-sm"
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <CheckCircle2
                    className="w-4 h-4 text-[#4A6FA5] shrink-0"
                    aria-hidden="true"
                    data-testid="highlight-check"
                  />
                  {highlight}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
