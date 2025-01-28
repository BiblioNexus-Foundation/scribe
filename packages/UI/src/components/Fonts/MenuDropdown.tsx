import React, { useState } from "@theia/core/shared/react";
import { useDetectFonts, fontList as fontsArray } from "font-detect-rhl";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/Command";
import { cn } from "../../utils/clsx";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface MenuDropdownProps {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  buttonStyle?: string;
  showIcon?: boolean;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  selectedFont,
  setSelectedFont,
  buttonStyle,
  showIcon = true,
}) => {
  const detectedFonts = useDetectFonts({ fonts: fontsArray });
  const [query, setQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const filteredFonts = query
    ? detectedFonts.filter((font: any) =>
        font.name
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.toLowerCase().replace(/\s+/g, ""))
      )
    : detectedFonts;

  const handleFontClick = (font: string) => {
    setSelectedFont(font);
    setIsOpen(false);
    setQuery("");
  };

  const handleSelect = (font: any) => {
    setValue(font.name === value ? "" : font.name);
    setOpen(false);
    handleFontClick(font.name);
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className={cn(
              "cursor-pointer focus:outline-none py-2 px-2 text-left sm:text-sm flex",
              buttonStyle
            )}
          >
            {showIcon ? (
              <div className="border rounded-md p-1">A E</div>
            ) : (
              <span className="self-center">Font</span>
            )}
          </button>
        </DialogTrigger>
        <DialogContent className="mt-2 flex-col bg-gray-800 border-none z-50 flex items-center justify-center">
          <div className="w-3/4 ">Font Selected</div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <button
                role="combobox"
                aria-expanded={open}
                className="w-[350px] justify-between flex items-center px-4 py-2 bg-gray-900 rounded-md text-neutral-400"
              >
                {value
                  ? filteredFonts.find((font) => font.name === value)?.name
                  : "Select font..."}
                <ChevronsUpDown className="opacity-50" />
              </button>
            </PopoverTrigger>

            <PopoverContent className="w-[350px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search font"
                  value={query}
                  style={{
                    fontFamily: query,
                    fontSize: "16px",
                  }}
                  onValueChange={(newValue) => setQuery(newValue)}
                />
                <CommandList>
                  <CommandEmpty>No font found.</CommandEmpty>
                  <CommandGroup className="max-h-[200px] overflow-auto">
                    {filteredFonts.map((font) => (
                      <CommandItem
                        key={font.name}
                        value={font.name}
                        onSelect={() => handleSelect(font)}
                        style={{
                          fontFamily: font.name,
                          fontSize: "16px",
                        }}
                      >
                        ➤ &nbsp;{font.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === font.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuDropdown;
