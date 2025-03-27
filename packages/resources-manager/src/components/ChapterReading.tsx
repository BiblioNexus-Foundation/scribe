import * as React from "@theia/core/shared/react";
import { Badge } from "../components/ui/Badge";
import { IconSettings } from "@tabler/icons-react";
import Button from "../components/Button";

export default function ChapterReading({
  version,
  chapterName,
  verse,
  scripture,
}: {
  version: string;
  chapterName: string;
  verse: string;
  scripture: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-zinc-200 px-2 py-2.5 dark:border-zinc-900">
        <Badge variant="destructive">{version}</Badge>
        <div className="flex items-center gap-[5px]">
          <Button label={chapterName} />
          <Button label={verse} />
          <Button icon={<IconSettings size={14} stroke={2} strokeLinejoin="miter" />} />
        </div>{" "}
      </div>
      <div className="mx-auto mt-2.5 max-w-md space-y-2 font-normal">
        <h2 className="text-center text-xl leading-5 tracking-wide text-cyan-500">{`${chapterName} ${verse}`}</h2>
        <article className="whitespace-pre-line text-center text-xs leading-5 tracking-wide text-zinc-700 dark:text-zinc-50">
          {scripture}
        </article>
      </div>
    </div>
  );
}
