import React from "@theia/core/shared/react";
import { Badge } from "./ui/Badge";
interface ChapterNavigatorProps {
  activeBookData: any[];
  activeNumber: number | null;
  setActiveNumber: (number: number | null) => void;
}

const ChapterNavigator = ({
  activeBookData,
  activeNumber,
  setActiveNumber,
}: ChapterNavigatorProps) => {
  const handleNumberClick = (number: number) => {
    setActiveNumber(number);
  };
  return (
    <div className="flex-col">
      <div className="w-3/4 p-1">
        <div>
          <div className="grid grid-cols-7 gap-3">
            {activeBookData?.map((chapter) => (
              <div
                key={chapter}
                className={`text-center  items-center  px-2 text-[11px] rounded-md cursor-pointer flex justify-center item-center ${"bg-transparent hover:bg-cyan-900"}`}
                onClick={() => handleNumberClick(chapter.number)}
              >
                {activeNumber === chapter.number ? (
                  <Badge variant="destructive">{chapter.number}</Badge>
                ) : (
                  chapter.number
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavigator;
