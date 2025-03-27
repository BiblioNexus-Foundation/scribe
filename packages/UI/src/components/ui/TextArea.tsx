import * as React from "@theia/core/shared/react";

import { cn } from "../../utils/clsx";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "border-[rgb(250 250 250 / 0.1)] ring-offset-background border-[rgb(250 250 250 / 0.1)] focus-visible:ring-ring flex min-h-[80px] w-full rounded-[20px] border bg-[var(--theia-editor-background)] px-4 py-3 text-xs text-[var(--theia-settings-textInputForeground)] placeholder:text-zinc-50 focus:border-cyan-500 focus-visible:outline-none focus-visible:ring disabled:cursor-not-allowed disabled:opacity-50",
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
