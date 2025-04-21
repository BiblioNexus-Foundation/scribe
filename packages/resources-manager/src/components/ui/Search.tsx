import { IconSearch } from "@tabler/icons-react";
import * as React from "@theia/core/shared/react";
import { cn } from "../../utils/clsx";

export default function Search({
  className,
  placeHolder,
  HandleChange,
}: {
  className: string;
  placeHolder: string;
  HandleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative text-xs text-zinc-700 dark:text-zinc-50">
      {" "}
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
        <IconSearch size={16} stroke={1.5} strokeLinejoin="miter" />
      </span>
      <input
        placeholder="Search"
        onChange={HandleChange}
        className={cn(
          className,
          "h-8 w-full rounded-full border border-zinc-300 bg-zinc-50 pl-8 text-left focus:outline-none focus:ring-[.5px] focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:ring-zinc-700"
        )}
      />
    </div>
  );
}
