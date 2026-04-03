import React, { type ElementType, type ComponentPropsWithoutRef } from "react";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export default function Card<T extends ElementType = "div">({
  as,
  children,
  className = "",
  ...rest
}: CardProps<T>) {
  const Component = as ?? "div";
  return (
    <Component
      className={`bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full overflow-hidden ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
