import React, { useState, type ComponentPropsWithoutRef } from "react";

type ImageWithFallbackProps = ComponentPropsWithoutRef<"img">;

export default function ImageWithFallback({
  onError,
  alt,
  ...rest
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        data-testid="image-fallback"
        aria-label={alt}
        role="img"
        className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#4A6FA5] to-[#2D4A6B]"
      >
        <svg
          viewBox="0 0 968 576"
          className="w-3/5 h-3/5"
          style={{ fill: "white", opacity: 0.6 }}
          aria-hidden="true"
        >
          <path d="M724.8,77h-91.6c-3,0-5.9,1.6-7.4,4.3L482.6,329.5c-3.3,5.7,0.8,12.8,7.4,12.8h91.6c3,0,5.9-1.6,7.4-4.3L732.2,89.8C735.5,84.1,731.4,77,724.8,77z" />
          <path d="M881.1,77h-91.6c-3,0-5.9,1.6-7.4,4.3L638.9,329.5c-3.3,5.7,0.8,12.8,7.4,12.8h91.6c3,0,5.9-1.6,7.4-4.3L888.5,89.8C891.8,84.1,887.7,77,881.1,77z" />
          <path d="M290.1,288.6h-91.6c-3,0-5.9,1.6-7.4,4.3L79.5,486.2c-3.3,5.7,0.8,12.8,7.4,12.8h91.6c3,0,5.9-1.6,7.4-4.3l111.7-193.4C300.8,295.6,296.7,288.6,290.1,288.6z" />
          <path d="M568.5,77h-91.6c-3,0-5.9,1.6-7.4,4.3L235.8,486.2c-3.3,5.7,0.8,12.8,7.4,12.8h91.6c3,0,5.9-1.6,7.4-4.3L575.9,89.8C579.2,84.1,575.1,77,568.5,77z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      onError={(e) => {
        setHasError(true);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
