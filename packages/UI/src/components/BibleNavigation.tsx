import React from '@theia/core/shared/react';
import {
  LockKeyhole,
  Layers,
  Type,
  Layout as LayoutIcon,
  Bookmark,
  RefreshCw,
  Settings,
  CloudDownload,
  Laptop,
} from 'lucide-react';

const BibleNavigation = () => {
  return (
    <div className='border-b w-full'>
      <div className='flex items-center justify-between p-2 gap-2'>
        <div className='w-2/5  px-2 justify-end items-end flex'>
          <div className='flex items-center space-x-2   hover:bg-zinc-800 overflow-hidden   rounded-md max-w-[160px] text-zinc-300 border cursor-pointer border-zinc-400 '>
            <button
              className={` rounded-l  bg-cyan-600  text-zinc-900 hover:bg-cyan-700  p-2`}
            >
              <LockKeyhole size={18} />
            </button>

            <span className='text-[11px]  text-nowrap px-2'>
              2 Thessalonians 3
            </span>
          </div>
        </div>

        <div className='flex items-center border-r border-l px-3 border-zinc-700 justify-center gap-3 flex-1'>
          <button className='text-gray-400 hover:text-cyan-600 flex items-center space-x-1 bg-zinc-700 rounded-md px-2 py-1'>
            <Layers size={16} />
            <span className='text-sm'>Resources</span>
          </button>

          <button className='text-gray-400 hover:text-cyan-600 flex items-center space-x-1 bg-zinc-700 rounded-md px-2 py-1'>
            <Type size={16} />
            <span className='text-sm'>Text size</span>
          </button>

          <button className='text-gray-400 hover:text-cyan-600 flex items-center space-x-1 bg-zinc-700 rounded-md px-2 py-1'>
            <LayoutIcon size={16} />
            <span className='text-sm'>Layout</span>
          </button>
        </div>
        <div className='w-1/5 flex items-center justify-center gap-4'>
          <button className='text-gray-400 hover:text-black flex items-center space-x-1 bg-zinc-700 rounded-md px-2 py-1'>
            <Laptop size={16} />
            <span className='text-sm'>Saved</span>
          </button>

          <button className='text-gray-400 hover:text-cyan-600 flex items-center space-x-1 bg-zinc-700 rounded-md px-2 py-1'>
            <CloudDownload size={16} />
            <span className='text-sm'>Synced</span>
          </button>

          <button className='text-gray-400 hover:text-cyan-600 flex items-center space-x-1 bg-zinc-700 rounded-md px-2 py-1.5'>
            <Settings size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BibleNavigation;
