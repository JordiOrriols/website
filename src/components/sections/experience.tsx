import React from "react";
import { motion } from "framer-motion";
import { Calendar, Globe, CheckCircle2, Code } from "lucide-react";
import { ExperienceEntry } from "@/data/experience";
import { useTranslation } from "react-i18next";
import Modal from "../ui/modal";

interface Props {
  title: string;
  subtitle: string;
  options: ExperienceEntry[];
  onClose: () => void;
}

export default function WorkTimeline({
  title,
  subtitle,
  options,
  onClose,
}: Props): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <Modal title={title} subtitle={subtitle} onClose={onClose} maxWidth="max-w-4xl">
      <div className="relative h-full pr-2">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2D4A6B] to-transparent"></div>

        <div className="space-y-8">
          {options.map((site, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="relative pl-20"
            >
              <div className="absolute left-5 top-2 w-6 h-6 bg-[#2D4A6B] rounded-full border-4 border-white shadow-md flex items-center justify-center">
                <Globe className="w-3 h-3 text-white" />
              </div>

              <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow duration-300">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-[#2D4A6B]">{site.period}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{site.title}</h3>
                  <p className="text-gray-600 font-medium text-sm mb-2">{site.company}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{site.description}</p>
                </div>

                {/* Objectives */}
                {site.achievements && site.achievements.length > 0 ? (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t("goalsAndAchievements")}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {site.achievements.map((objective, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Technologies */}
                {site.tech && site.tech.length > 0 ? (
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="w-4 h-4 text-gray-400" />
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {t("technologies")}
                      </span>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {site.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-lg text-xs font-medium hover:border-[#2D4A6B] hover:text-[#2D4A6B] transition-colors duration-200 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
