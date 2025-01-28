import * as React from "@theia/core/shared/react";
import { Badge } from "./ui/Badge";
import { IconSettings, IconX } from "@tabler/icons-react";
import Button from "./Button";
import MenuDropdown from "./Fonts/MenuDropdown";

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
      <div className="flex items-center border-b py-2.5 px-2 dark:border-zinc-900 border-zinc-200 justify-between">
        <div className="flex gap-2 items-center justify-center">
          
          <MenuDropdown
            selectedFont="font"
            buttonStyle="button text-[10px] text-gray-200 bg-primary-500 hover:bg-primary-500/90 text-highlight-300 gap-1"
            key={21}
            showIcon={true}
            setSelectedFont={(font) =>
              console.log("====================", font)
            }
          />
          <Button
            label=""
            className="flex-row-reverse gap-3 rounded-none border-none dark:bg-transparent   text-[10px] flex item-center justify-content-center dark:text-gray-300 text-gray-600"
            icon={<IconX size={15} stroke={2} strokeLinejoin="miter" />}
          />
        </div>
        <Badge variant="destructive">{version}</Badge>
        <div className="flex items-center gap-[5px]">
          <Button label={chapterName} />
          <Button label={verse} />
          <Button
            icon={<IconSettings size={14} stroke={2} strokeLinejoin="miter" />}
          />
        </div>{" "}
      </div>
      <div className="mt-2.5 font-normal space-y-2 mx-auto max-w-md">
        <h2 className="text-cyan-500 leading-5 text-center text-xl tracking-wide">{`${chapterName} ${verse}`}</h2>
        <article className="dark:text-zinc-50 text-zinc-700 leading-5   text-xs tracking-wide text-center whitespace-pre-line">
          {scripture}
        </article>
      </div>
    </div>
  );
}
