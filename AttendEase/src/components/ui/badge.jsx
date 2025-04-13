import * as React from "react";
import { cn } from "@/lib/utils"; // Use only if you have cn(), else replace

const variantClasses = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "border border-input text-foreground"
};

const Badge = ({ children, className, variant = "default", ...props }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Badge };
