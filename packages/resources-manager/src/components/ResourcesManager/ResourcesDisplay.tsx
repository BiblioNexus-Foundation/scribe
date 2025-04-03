import React, { useEffect, useState } from '@theia/core/shared/react';
import { VSCodeButton } from '@vscode/webview-ui-toolkit/react';
import type { ConfigResourceValues } from '../../browser/resources/types';
import Search from '../ui/Search';
import {
  ChevronsUpDown,
  Laptop,
  Download,
  Plus,
  X,
  MoreVertical,
} from 'lucide-react';

const ResourceTypeDisplay = ({
  resourceType,
  downloadedResources,
  openResource,
}: {
  resourceType: {
    value: string;
    label: string;
    getTableDisplayData: (search?: string) => Promise<any[]>; // TODO: type this
    downloadHandler: (resource: any) => void; // TODO: type this
  };

  downloadedResources: ConfigResourceValues[];

  openResource: (resource: ConfigResourceValues) => void;
}) => {
  const [resourceTableData, setResourceTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string | undefined>('');
  const [activeButton, setActiveButton] = useState('download');
  const [itemsPerPage, setItemPerPage] = useState(10);

  useEffect(() => {
    resourceType.getTableDisplayData(searchTerm).then((data) => {
      setResourceTableData(data);
    });
  }, [searchTerm, resourceType]);

  const handleDownload = (resource: any) => {
    resourceType.downloadHandler(resource);
  };
  const startIndex = currentPage * itemsPerPage;

  // FILTER THE DATA BASED ON THE ACTIVE BUTTON

  // const filteredData = resourceTableData.filter((resource) => {
  //   const isDownloaded = downloadedResources.some(
  //     (item) => item.id === resource.id
  //   );
  //   return activeButton === 'download' ? isDownloaded : !isDownloaded;
  // });
  const filteredData = resourceTableData;

  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (startIndex + itemsPerPage < resourceTableData.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  return (
    <div className='flex flex-col w-full '>
      {/* <div className='flex p-2 gap-2 mb-3 justify-between mx-2'>
        <div className='flex gap-1 p-1 rounded-lg'>
          <VSCodeButton
            title='Download'
            className={`rounded-lg duration-200 downloadButton font-extrabold border ${
              activeButton === 'download'
                ? 'text-white border-accent bg-primary'
                : 'bg-transparent text-[var(--theia-settings-textInputForeground)]'
            }`}
            onClick={() => {
              setActiveButton('download'), setCurrentPage(0);
            }}
          >
            DOWNLOADss
          </VSCodeButton>
          <VSCodeButton
            title='Online'
            className={`rounded-lg duration-200 downloadButton font-extrabold border ${
              activeButton === 'online'
                ? 'text-white border-accent bg-primary'
                : 'bg-transparent text-[var(--theia-settings-textInputForeground)]'
            }`}
            onClick={() => {
              setActiveButton('online'), setCurrentPage(0);
            }}
          >
            ONLINEss
          </VSCodeButton>
        </div>
        <div className='w-1/3 text-right items-center'>
          <Search
            className='border border-muted'
            placeHolder='Search sjsjdhsj'
            HandleChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div> */}
      <div className='gap-4 p-3 flex justify-between items-center  sticky top-0 z-10 '>
        <div className='flex flex-1 items-center gap-3 px-4'>
          <div className='relative flex-1'>
            <input
              type='text'
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
              placeholder='Find Title...'
              className='pl-3  py-1.5 border border-border rounded w-full text-sm bg-input text-foreground'
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
      <div className='flex flex-1 justify-between flex-col gap-2  border-l border-t  border-muted pb-3 min-h-[65vh]'>
        <div className='max-h-[55vh] overflow-scroll'>
          <table className='table-auto w-full border-b border-muted p-10'>
            <thead className='font-semibold pb-4  '>
              <tr className='border-b border-muted  px-2'>
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

            <tbody className='gap-3'>
              {paginatedData.length > 0 ? (
                paginatedData?.map((resource) => (
                  <tr className='py-2'>
                    <td className='px-3'>{resource.name}</td>
                    <td className='p-2 max-w-20 px-4 py-2 w-1/4'>
                      <span className='text-xs bg-cyan-700 rounded-full px-2 text-black font-medium py-0.4'>
                        {resource.fullResource.language}
                      </span>
                    </td>
                    <td
                      title={`Released on : ${new Date(
                        resource.version.releaseDate
                      ).toLocaleDateString()}`}
                      className='px-4 py-2 w-1/4'
                    >
                      {resource.fullResource.owner}
                    </td>
                    <td className='px-4 py-2 w-1/4'>
                      {new Date(resource.version.releaseDate).getFullYear()}
                    </td>
                    <td className='flex items-center justify-center px-2 py-2 w-1/3'>
                      {!downloadedResources.find(
                        (item) => item.id === resource.id
                      ) ? (
                        <button
                          title='Download Resource'
                          className='w-5 flex justify-center'
                          onClick={() => handleDownload(resource)}
                        >
                          <Download className='h-5 w-5 text-gray-400 hover:text-cyan-600' />
                        </button>
                      ) : (
                        <button
                          title='Open Resource'
                          className='w-5  flex justify-center'
                          onClick={() =>
                            openResource(
                              downloadedResources.find((item) => item.id === resource.id)!
                            )
                          }
                        >
                          <Laptop className='h-5 w-5 text-gray-400 hover:text-cyan-600' />
                        </button>
                      )}
                    </td>
                    <td className='p-2'>
                      <div className='relative'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // handleMenuToggle(menuId);
                          }}
                          className='flex items-center justify-center'
                        >
                          <MoreVertical className='h-5 w-5 text-gray-400 hover:text-cyan-600' />
                        </button>
                        {/* {openMenuId === menuId && (
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
                        )} */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className='text-center py-4 h-full'>
                    No Resources available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='flex justify-end gap-2 items-center pt-3 w-full px-2 border-t border-muted'>
          <div className='flex items-center justify-center gap-1 mr-7'>
            <h1 className='font-semibold'>Rows per page</h1>
            <select
              name='select'
              onChange={(value) => {
                setItemPerPage(Number(value.target.value));
                setCurrentPage(0);
              }}
              id='2'
              className='rounded-md flex items-center text-center justify-center bg-background border p-1'
            >
              <option>7</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className='font-semibold'>
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className='flex gap-2'>
            <VSCodeButton
              title='Previous Page'
              appearance='secondary'
              className='rounded-md border'
              onClick={prevPage}
              disabled={currentPage === 0}
            >
              &#10094;{' '}
            </VSCodeButton>
            <VSCodeButton
              title='Next Page'
              appearance='secondary'
              className='rounded-md border'
              onClick={nextPage}
              disabled={startIndex + itemsPerPage >= filteredData.length}>
              &#10095;
            </VSCodeButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResourceTypeDisplay;
