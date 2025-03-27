import React from '@theia/core/shared/react';
import { Plus, X } from 'lucide-react';
import ResourceTable from './resource-table';
import Sidebar from './siderbar';

function ResourceManage() {
  return (
    <div className='flex flex-col  border border-border rounded h-[85vh] ov'>
      {/* Filter Section */}
      <div className='border-b border-border p-3 flex justify-between items-center bg-background sticky top-0 z-10'>
        <div className='w-56 flex items-end justify-end'>
          <h2 className='font-medium text-foreground'>Filter</h2>
        </div>
        <div className='flex items-center gap-3'>
          <div className='relative flex-1'>
            <input
              type='text'
              placeholder='Find Title...'
              className='pl-3 pr-4 py-1.5 border border-border rounded w-80 text-sm bg-input text-foreground'
            />
          </div>
          <button className='flex items-center gap-1 border border-border rounded px-2 py-1.5 text-sm hover:bg-accent text-foreground'>
            <Plus className='h-3.5 w-3.5' />
            <span>Language</span>
          </button>
          <button className='flex items-center gap-1 border border-border rounded px-2 py-1.5 text-sm hover:bg-accent text-foreground'>
            <Plus className='h-3.5 w-3.5' />
            <span>Publisher</span>
          </button>
          <button className='flex items-center gap-1 border border-border rounded px-2 py-1.5 text-sm hover:bg-accent text-foreground'>
            <Plus className='h-3.5 w-3.5' />
            <span>Year</span>
          </button>
          <button className='flex items-center gap-1 border border-border rounded px-2 py-1.5 text-sm hover:bg-accent text-foreground'>
            <Plus className='h-3.5 w-3.5' />
            <span>Status</span>
          </button>
          <div className='flex hover:text-cyan-600 cursor-pointer items-center justify-center gap-2'>
            <button className='text-sm text-muted hover:text-foreground'>
              Reset
            </button>
            <X className='h-3.5 w-3.5 text-muted' />
          </div>
        </div>
      </div>

      <div className='flex flex-1 overflow-hidden'>
        {/* Sidebar */}
        <Sidebar />
        <div className='w-full'>
          <ResourceTable />
        </div>
      </div>
    </div>
  );
}

export default ResourceManage;
