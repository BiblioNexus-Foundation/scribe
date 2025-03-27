import React, { useState } from "react";

interface Option {
  label: string;
  value: any;
}

interface SelectDropdownProps {
  options: Option[];
  selectedOption: Option;
  setSelectedOption: any;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const truncateText = (text: string) => {
    return text.length > 15 ? text.slice(0, 15) + "..." : text;
  };

  return (
    <div className="relative w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border bg-cyan-400 px-4 text-center text-black shadow-sm">
        {truncateText(selectedOption.label)}
        <span className="absolute top-1/2 -translate-y-1/2 transform text-black">▼</span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full rounded-md border shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className="cursor-pointer px-4 py-2 hover:bg-cyan-400">
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
