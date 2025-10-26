import React from "react";

interface Props {
  options: { label: string; value: string }[];
}

export default function Stats(props: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 px-8 pb-12">
      {props.options.map((option) => (
        <div className="text-center">
          <div className="text-5xl font-extralight text-gray-800 mb-2">
            {option.value}
          </div>
          <div className="text-gray-400 text-sm tracking-wider">
            {option.label}
          </div>
        </div>
      ))}
    </div>
  );
}
