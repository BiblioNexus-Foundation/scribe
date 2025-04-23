import { IconSearch } from "@tabler/icons-react";
import * as React from "@theia/core/shared/react";
import { cn } from "../../utils/clsx";

export default function Search({ className }: { className: string }) {
  return (
    <div className="relative text-xs text-zinc-700 dark:text-zinc-50">
      {" "}
      <span className="pointer-events-none absolute inset-y-0 left-[38%] flex items-center">
        <IconSearch size={16} stroke={1.5} strokeLinejoin="miter" />
      </span>
      <input
        placeholder="Search"
        className={cn(
          className,
          "h-10 rounded-full border border-zinc-300 bg-zinc-50 text-center focus:border-transparent focus:outline-none focus:ring-[.5px] focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-700"
        )}
      />
    </div>
  );
}
