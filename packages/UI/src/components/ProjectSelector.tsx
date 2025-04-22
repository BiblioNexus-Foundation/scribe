import * as React from "@theia/core/shared/react";
import { Badge } from "./ui/Badge";

export default function ProjectSelector({ title, icon }: { title: string; icon: React.ReactNode }) {
  return (
    <div className="group flex h-40 w-full cursor-pointer flex-col items-center justify-center gap-5 rounded-3xl border border-zinc-300 bg-zinc-50 font-semibold uppercase text-zinc-700 transition-all duration-200 hover:border-cyan-500 hover:text-cyan-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-50">
      <span className="text-xs leading-4 tracking-wide">{title}</span>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-200 stroke-zinc-500 group-hover:stroke-cyan-500 dark:bg-zinc-800 dark:stroke-zinc-50">
        {icon}
      </span>
      {title === "Open project" && <Badge className="ml-[14px] mr-auto">12 projects</Badge>}
    </div>
  );
}
