import React from '@theia/core/shared/react';
import { Circle } from 'lucide-react';

interface Resource {
  type: string;
  items: Array<{
    title: string;
    language: string;
    publisher: string;
    year: string;
    hasDownload: boolean;
    isSelected?: boolean;
  }>;
}

interface SidebarProps {
  activeItem: string;
  onItemSelect: (type: string) => void;
  resources: Resource[];
}

export default function Sidebar({
  activeItem,
  onItemSelect,
  resources,
}: SidebarProps) {
  return (
    <div className='w-64 border-r border-blue-200 py-4 pl-3 pr-1'>
      <div className='mb-6 w-full'>
        <h3 className='text-sm font-medium mb-2 text-cyan-600'>
          Resources Picker
        </h3>
        <div className='h-[70vh] overflow-scroll w-full custom-scroll'>
          {resources.map((resource, idx) => (
            <div key={idx} className='mb-1'>
              <div className=' px-2'>
                <div
                  onClick={() => onItemSelect(resource.type)}
                  className={`flex items-center  p-2 rounded cursor-pointer
                    ${
                      activeItem === resource.type
                        ? 'bg-cyan-400 text-black'
                        : 'hover:bg-cyan-400 hover:text-black'
                    }`}
                >
                  <span
                    className={`text-sm ${
                      activeItem === resource.type
                        ? 'text-black'
                        : 'text-gray-500'
                    }`}
                  >
                    {resource.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
