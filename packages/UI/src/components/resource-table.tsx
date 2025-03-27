import React from '@theia/core/shared/react';
import { Download, MoreVertical, ChevronsUpDown, Laptop } from 'lucide-react';

const resources = [
  {
    type: 'Text Bible',
    items: [
      {
        title: "A very long resource name so it's too lo...",
        language: 'eng',
        publisher: 'unfoldingWord',
        year: '2020',
        hasDownload: true,
      },
      {
        title: "A very long resource name so it's too lo...",
        language: 'eng',
        publisher: 'unfoldingWord',
        year: '2020',
        hasDownload: false,
        isSelected: true,
      },
      {
        title: "A very long resource name so it's too lo...",
        language: 'eng',
        publisher: 'unfoldingWord',
        year: '2020',
        hasDownload: true,
      },
    ],
  },
  {
    type: 'Open Bible Story',
    items: [
      {
        title: "A very long resource name so it's too lo...",
        language: 'eng',
        publisher: 'unfoldingWord',
        year: '2020',
        hasDownload: true,
      },
      {
        title: "A very long resource name so it's too lo...",
        language: 'eng',
        publisher: 'unfoldingWord',
        year: '2020',
        hasDownload: true,
      },
      {
        title: "A very long resource name so it's too lo...",
        language: 'eng',
        publisher: 'unfoldingWord',
        year: '2020',
        hasDownload: true,
      },
    ],
  },
];

export default function ResourceTable() {
  return (
    <div className=''>
      <div className=''>
        <table className='w-full h-[70vh] overflow-auto'>
          <thead>
            <tr className='border-b border-gray-200 sticky top-0 bg-background'>
              <th className='text-left p-4 font-medium'>
                <div className='flex items-center gap-1'>
                  Title
                  <ChevronsUpDown className='h-4 w-4' />
                </div>
              </th>
              <th className='text-left p-4 font-medium'>
                <div className='flex items-center gap-1'>
                  Language
                  <ChevronsUpDown className='h-4 w-4 text-gray-300' />
                </div>
              </th>
              <th className='text-left p-4 font-medium'>
                <div className='flex items-center gap-1'>
                  Publisher
                  <ChevronsUpDown className='h-4 w-4 text-gray-300' />
                </div>
              </th>
              <th className='text-left p-4 font-medium'>
                <div className='flex items-center gap-1'>
                  Year
                  <ChevronsUpDown className='h-4 w-4 text-gray-300' />
                </div>
              </th>
              <th className='text-left p-4 font-medium'>
                <div className='flex items-center gap-1'>
                  Status
                  <ChevronsUpDown className='h-4 w-4 text-gray-300' />
                </div>
              </th>
              <th className='p-4'></th>
            </tr>
          </thead>
          <tbody className='border-b border-gray-200 mb-2'>
            {resources.map((resourceGroup, groupIndex) => (
              <>
                <tr key={`group-${groupIndex}`}>
                  <td colSpan={6} className='p-4 font-medium'>
                    {resourceGroup.type}
                  </td>
                </tr>
                {resourceGroup.items.map((item, itemIndex) => (
                  <tr
                    key={`item-${groupIndex}-${itemIndex}`}
                    className={`${
                      item.isSelected ? 'bg-gray-800' : ''
                    } hover:bg-gray-900`}
                  >
                    <td className='p-4'>{item.title}</td>
                    <td className='p-4'>{item.language}</td>
                    <td className='p-4'>{item.publisher}</td>
                    <td className='p-4'>{item.year}</td>
                    <td className='p-4'>
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
                    <td className='p-4'>
                      <button>
                        <MoreVertical className='h-5 w-5 text-gray-400 hover:text-cyan-600' />
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className='w-full flex justify-end px-5 mt-3'>
        <button className='bg-cyan-600 text-black px-4 py-2 rounded hover:bg-cyan-700'>
          Open Resource
        </button>
      </div>
    </div>
  );
}
