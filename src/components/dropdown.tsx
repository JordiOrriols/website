import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslation } from "react-i18next";

interface Props {
  auto: string;
  placeholder: string;
  disabled: boolean;
  options: { label: string; value: string }[];
  value: string;
  onValueChange: (value: string) => void;
}

function capitalizeFirstLetter(val) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export default function Dropdown(props: Props) {
  const { t } = useTranslation();
  return (
    <Select value={props.value} onValueChange={props.onValueChange} disabled={props.disabled}>
      <SelectTrigger className="w-56 bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="auto">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            {t("current")} ({capitalizeFirstLetter(props.auto)})
          </div>
        </SelectItem>
        {props.options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
