import React from "react";
import { motion } from "framer-motion";

interface Props {
  options: {
    label: string;
    value: string;
    unit?: string;
    onClick: () => void;
    disabled?: boolean;
  }[];
}

export default function Stats(props: Props) {
  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-4 gap-8 px-8 pb-7"
      role="group"
      aria-label="Statistics"
      data-testid="stats-section"
    >
      {props.options.map((option) => (
        <motion.button
          key={option.label}
          onClick={option.onClick}
          disabled={option.disabled}
          whileHover={option.disabled ? undefined : { scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className={`text-center rounded-xl p-4 transition-colors duration-200 ${
            option.disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-gray-100"
          }`}
          aria-label={`${option.label}: ${option.value}${option.unit ? ` ${option.unit}` : ""}`}
          aria-disabled={option.disabled}
          data-testid={`stat-${option.label.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <div className="text-center">
            <div className="text-5xl font-extralight text-gray-800 mb-2">{option.value}</div>
            <div className="text-gray-400 text-sm tracking-wider">{option.label}</div>
            {option.unit ? (
              <div className="text-xs font-extralight text-gray-300">({option.unit})</div>
            ) : null}
          </div>
        </motion.button>
      ))}
    </div>
  );
}
