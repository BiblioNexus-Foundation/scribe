import * as React from "@theia/core/shared/react";
import { Badge } from "./ui/Badge";
import { IconSettings } from "@tabler/icons-react";
import Button from "./Button";

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
    <div className="bg-[var(--theia-editor-background)]">
      <div className="border-[rgb(250 250 250 / 0.1)] flex items-center justify-between border-b bg-[var(--theia-editor-background)] px-2 py-2.5">
        <Badge variant="destructive">{version}</Badge>
        <div className="flex items-center gap-[5px]">
          <Button label={chapterName} />
          <Button label={verse} />
          <Button icon={<IconSettings size={14} stroke={2} strokeLinejoin="miter" />} />
        </div>{" "}
      </div>
      <div className="mx-auto mt-2.5 max-w-md space-y-2 font-normal">
        <h2 className="text-center text-xl leading-5 tracking-wide text-cyan-500">{`${chapterName} ${verse}`}</h2>
        <article className="whitespace-pre-line text-center text-xs leading-5 tracking-wide text-[var(--theia-settings-textInputForeground)]">
          {scripture}
        </article>
      </div>
    </div>
  );
}
