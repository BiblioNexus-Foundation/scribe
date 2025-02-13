import * as React from "@theia/core/shared/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../utils/clsx";

const badgeVariants = cva(
  "inline-flex items-center justify-center   tracking-wider font-bold transition-colors focus:outline-none ",
  {
    variants: {
      variant: {
        default:
          "border-transparent border b rounded-full px-2 py-[5px] uppercase text-[8px] dark:bg-cyan-500 bg-cyan-400 text-zinc-800 dark:text-zinc-950",
        secondary:
          "h-4 w-4 text-[8px]  rounded-full tracking-wider bg-cyan-400 text-zinc-800 dark:text-zinc-950",
        destructive:
          "border-transparent bg-cyan-100  border  text-cyan-700 rounded-lg px-[6px] py-1 text-[10px]",
        outline: "text-foreground border",
        rounded:
        "h-[22px] w-[22px] border border-[rgb(250 250 250 / 0.1)] bg-[var(--theia-editor-background)]  hover:bg-cyan-800   text-cyan-700 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
