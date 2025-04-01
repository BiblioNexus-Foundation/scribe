import React, { useState } from '@theia/core/shared/react';
import { Download, MoreVertical, ChevronsUpDown, Laptop } from 'lucide-react';

interface ResourceTableProps {
  activeItem: string;
  resources: Array<{
    type: string;
    items: Array<{
      title: string;
      language: string;
      publisher: string;
      year: string;
      hasDownload: boolean;
      isSelected?: boolean;
    }>;
  }>;
}

export default function ResourceTable({
  activeItem,
  resources,
}: ResourceTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const filteredResources = resources.filter(
    (resource) => resource.type === activeItem
  );

  const handleMenuToggle = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleMenuAction = (action: string, item: any) => {
    switch (action) {
      case 'delete':
        console.log('Delete', item);
        break;
      case 'open':
        console.log('Open', item);
        break;
      case 'share':
        console.log('Share', item);
        break;
      default:
        break;
    }
    setOpenMenuId(null);
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => setOpenMenuId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className=''>
      <div className='w-full h-[69vh] overflow-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-gray-200 sticky top-0 bg-background'>
              <th className='text-left p-2 font-medium'>
                <div className='flex items-center gap-1'>
                  Title
                  <ChevronsUpDown className='h-4 w-4 cursor-pointer' />
                </div>
              </th>
              <th className='text-left p-2 font-medium'>
                <div className='flex items-center gap-1'>
                  Language
                  <ChevronsUpDown className='h-4 w-4 text-gray-300 cursor-pointer' />
                </div>
              </th>
              <th className='text-left p-2 font-medium'>
                <div className='flex items-center gap-1'>
                  Publisher
                  <ChevronsUpDown className='h-4 w-4 text-gray-300 cursor-pointer' />
                </div>
              </th>
              <th className='text-left p-2 font-medium'>
                <div className='flex items-center gap-1'>
                  Year
                  <ChevronsUpDown className='h-4 w-4 text-gray-300 cursor-pointer' />
                </div>
              </th>
              <th className='text-left p-2 font-medium'>
                <div className='flex items-center gap-1'>
                  Status
                  <ChevronsUpDown className='h-4 w-4 text-gray-300 cursor-pointer' />
                </div>
              </th>
              <th className='p-2'></th>
            </tr>
          </thead>
          <tbody className='mb-2'>
            {filteredResources.map((resourceGroup, groupIndex) => (
              <React.Fragment key={`group-${groupIndex}`}>
                <tr>
                  <td colSpan={6} className='p-2 font-bold text-lg'>
                    {resourceGroup.type}
                  </td>
                </tr>
                {resourceGroup.items.map((item, itemIndex) => {
                  const menuId = `menu-${groupIndex}-${itemIndex}`;
                  return (
                    <tr
                      key={`item-${groupIndex}-${itemIndex}`}
                      className={`${
                        item.isSelected ? 'bg-gray-800' : ''
                      } hover:bg-gray-900`}
                    >
                      <td className='p-2'>{item.title}</td>
                      <td className='p-2 max-w-20'>
                        <span className='text-xs bg-cyan-700 rounded-full px-2 text-black font-medium py-0.4'>
                          {item.language}
                        </span>
                      </td>
                      <td className='p-2'>{item.publisher}</td>
                      <td className='p-2'>{item.year}</td>
                      <td className='p-2'>
                        {item.isSelected ? (
                          <div className='flex justify-center cursor-pointer'>
                            <Laptop className='h-5 w-5 text-gray-400 hover:text-cyan-600' />
                          </div>
                        ) : (
                          <div className='flex justify-center cursor-pointer'>
                            <Download className='h-5 w-5 text-gray-400 hover:text-cyan-600' />
                          </div>
                        )}
                      </td>
                      <td className='p-2'>
                        <div className='relative'>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMenuToggle(menuId);
                            }}
                            className='flex items-center justify-center'
                          >
                            <MoreVertical className='h-5 w-5 text-gray-400 hover:text-cyan-600' />
                          </button>
                          {openMenuId === menuId && (
                            <div className='absolute top-full right-0 mt-2 w-48 bg-background border border-border shadow-lg rounded-md py-1 z-50'>
                              <button
                                onClick={() => handleMenuAction('delete', item)}
                                className='w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center gap-2'
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleMenuAction('open', item)}
                                className='w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center gap-2'
                              >
                                Open
                              </button>
                              <button
                                onClick={() => handleMenuAction('share', item)}
                                className='w-full text-left px-4 py-2 text-sm text-foreground hover:bg-accent flex items-center gap-2'
                              >
                                Share
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className='w-full flex justify-end px-5 mt-2 border-t py-1 border-gray-200 sticky bottom-0 z-10'>
        <button className='bg-cyan-600 text-black px-4 py-2 rounded hover:bg-cyan-700'>
          Open Resource
        </button>
      </div>
    </div>
  );
}
