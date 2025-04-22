import * as React from "react";

import { cn } from "../../utils/clsx";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "ring-offset-background focus-visible:ring-ring flex min-h-[80px] w-full rounded-[20px] border border-zinc-200 bg-[var(--theia-secondaryButton-foreground)] px-4 py-3 text-xs text-zinc-700 placeholder:text-zinc-600 focus:border-cyan-500 focus-visible:outline-none focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
