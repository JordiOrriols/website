import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Card from "@/components/ui/card";

interface Principle {
  number: string;
  title: string;
  description: string;
}

export default function Philosophy() {
  const { t } = useTranslation();

  const principles = t("philosophyPrinciples", { returnObjects: true }) as Principle[];

  return (
    <Card data-testid="philosophy-section" className="max-h-[90dvh] overflow-y-auto">
      <div className="p-8 md:p-12">
        <span className="text-sm font-semibold tracking-widest text-[#4A6FA5] uppercase">
          {t("philosophyLabel")}
        </span>
        <h2 className="text-xl md:text-4xl font-light text-gray-800 mt-2 mb-8">
          <span className="md:hidden">{t("philosophyTitleShort")}</span>
          <span className="hidden md:inline">{t("philosophyTitle")}</span>
        </h2>
        <p className="text-gray-600 leading-relaxed mb-8">{t("philosophyIntro")}</p>

        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {principles.map((principle) => (
            <motion.div
              key={principle.number}
              data-testid={`principle-${principle.number}`}
              className="group flex gap-6 items-start"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <span className="text-3xl font-light text-gray-300 group-hover:text-[#4A6FA5] transition-colors duration-300 shrink-0">
                {principle.number}
              </span>
              <div>
                <h3 className="text-lg font-medium text-gray-800 group-hover:text-[#4A6FA5] transition-colors duration-300">
                  {principle.title}
                </h3>
                <p className="hidden md:block text-gray-500 mt-1 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Card>
  );
}
