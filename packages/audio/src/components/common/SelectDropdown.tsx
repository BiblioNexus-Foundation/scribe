import React, { useState } from 'react';

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

  return (
    <div className='relative w-64'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full px-4 text-black text-center bg-cyan-400 border rounded-lg shadow-sm'>
        {selectedOption.label}
        <span className='absolute text-black top-1/2 transform -translate-y-1/2'>
          ▼
        </span>
      </button>

      {isOpen && (
        <ul className='absolute left-0 w-full mt-2 border rounded-md shadow-lg'>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              className='px-4 py-2 cursor-pointer hover:bg-cyan-400'>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;
