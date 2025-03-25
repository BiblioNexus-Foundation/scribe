import React, { useEffect, useState } from "@theia/core/shared/react";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import type { ConfigResourceValues } from "../../browser/resources/types";
import Search from "../ui/Search";

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
  const [searchTerm, setSearchTerm] = useState<string | undefined>("");
  const [activeButton, setActiveButton] = useState("download");
  const [itemsPerPage, setItemPerPage] = useState(7);

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

  const filteredData = resourceTableData.filter((resource) => {
    const isDownloaded = downloadedResources.some((item) => item.id === resource.id);
    return activeButton === "download" ? isDownloaded : !isDownloaded;
  });

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
    <div className="flex w-full flex-col">
      <div className="mx-2 mb-3 flex justify-between gap-2 p-2">
        <div className="flex gap-1 rounded-lg p-1">
          <VSCodeButton
            title="Download"
            className={`downloadButton rounded-lg border font-extrabold duration-200 ${
              activeButton === "download"
                ? "border-accent bg-primary text-white"
                : "bg-transparent text-[var(--theia-settings-textInputForeground)]"
            }`}
            onClick={() => {
              setActiveButton("download"), setCurrentPage(0);
            }}>
            DOWNLOAD
          </VSCodeButton>
          <VSCodeButton
            title="Online"
            className={`downloadButton rounded-lg border font-extrabold duration-200 ${
              activeButton === "online"
                ? "border-accent bg-primary text-white"
                : "bg-transparent text-[var(--theia-settings-textInputForeground)]"
            }`}
            onClick={() => {
              setActiveButton("online"), setCurrentPage(0);
            }}>
            ONLINE
          </VSCodeButton>
        </div>
        <div className="w-1/3 items-center text-right">
          <Search
            className="border-muted border"
            placeHolder="Search sjsjdhsj"
            HandleChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
      </div>
      <div className="border-muted mx-3 flex min-h-[55vh] flex-1 flex-col justify-between gap-2 rounded-md border pb-3">
        <div className="max-h-[50vh] overflow-scroll">
          <table className="border-muted w-full table-auto border-b p-10">
            <thead className="pb-4 font-semibold">
              <tr
                className="border-muted sticky border-b py-3"
                style={{ padding: "10px", paddingBottom: "10px" }}>
                <td className="w-1/4 px-4 py-2">Words</td>
                <td className="w-1/4 px-4 py-2">Owner</td>
                <td className="w-1/4 px-4 py-2">Versions</td>
                <td className="w-1/4"></td>
              </tr>
            </thead>

            <tbody className="gap-3">
              {paginatedData.length > 0 ? (
                paginatedData?.map((resource) => (
                  <tr className="border-muted border-b py-2">
                    <td className="px-3">{resource.name}</td>
                    <td className="w-1/4 px-4 py-2">
                      {resource.owner.avatarUrl ? (
                        <img
                          src={resource.owner.avatarUrl}
                          alt={resource.owner.name}
                          className="h-8 w-8 rounded-lg object-contain"
                        />
                      ) : (
                        resource.owner.name
                      )}
                    </td>
                    <td
                      title={`Released on : ${new Date(
                        resource.version.releaseDate
                      ).toLocaleDateString()}`}
                      className="w-1/4 px-4 py-2">
                      {resource.version.tag}
                    </td>
                    <td className="flex w-1/4 items-center justify-center px-4 py-2">
                      {!downloadedResources.find((item) => item.id === resource.id) ? (
                        <VSCodeButton
                          title="Download Resource"
                          appearance="secondary"
                          className="flex w-full justify-center"
                          onClick={() => handleDownload(resource)}>
                          <i className="codicon codicon-cloud-download"></i>
                        </VSCodeButton>
                      ) : (
                        <VSCodeButton
                          title="Open Resource"
                          appearance="primary"
                          className="bg-primary flex w-full justify-center"
                          onClick={() =>
                            openResource(
                              downloadedResources.find((item) => item.id === resource.id)!
                            )
                          }>
                          <i className="codicon codicon-eye"></i>
                        </VSCodeButton>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-4 text-center">
                    No Resources available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="border-muted flex w-full items-center justify-end gap-2 border-t px-2 pt-3">
          <div className="mr-7 flex items-center justify-center gap-1">
            <h1 className="font-semibold">Rows per page</h1>
            <select
              name="select"
              onChange={(value) => {
                setItemPerPage(Number(value.target.value));
                setCurrentPage(0);
              }}
              id="2"
              className="bg-background flex items-center justify-center rounded-md border p-1 text-center">
              <option>7</option>
              <option>10</option>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="font-semibold">
            Page {currentPage + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <VSCodeButton
              title="Previous Page"
              appearance="secondary"
              className="rounded-md border"
              onClick={prevPage}
              disabled={currentPage === 0}>
              &#10094;{" "}
            </VSCodeButton>
            <VSCodeButton
              title="Next Page"
              appearance="secondary"
              className="rounded-md border"
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
