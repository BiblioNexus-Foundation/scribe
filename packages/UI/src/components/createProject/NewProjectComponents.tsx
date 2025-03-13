import React, { useState, ChangeEvent } from '@theia/core/shared/react';

interface ProjectData {
  projectName: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceDocument: File | null;
  folderLocation: string;
}

interface ProjectImportFormProps {
  onImport?: () => void;
  onCancel?: () => void;
  onCreateProject?: (data: ProjectData) => void;
  defaultFolder?: string;
}

const ProjectImportForm: React.FC<ProjectImportFormProps> = ({
  onImport,
  onCancel,
  onCreateProject,
  defaultFolder = 'Default',
}) => {
  const [isImporting, setIsImporting] = useState<boolean>(false);
  const [projectName, setProjectName] = useState<string>('');
  const [sourceLanguage, setSourceLanguage] = useState<string>('');
  const [targetLanguage, setTargetLanguage] = useState<string>('');
  const [sourceDocument, setSourceDocument] = useState<File | null>(null);
  const [folderLocation, setFolderLocation] = useState<string>(defaultFolder);

  const handleImportClick = (): void => {
    setIsImporting(true);
    if (onImport) {
      onImport();
    }
  };

  const handleCreateProject = (): void => {
    if (onCreateProject) {
      onCreateProject({
        projectName,
        sourceLanguage,
        targetLanguage,
        sourceDocument,
        folderLocation,
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      setSourceDocument(e.target.files[0]);
    }
  };

  const handleChangeFolder = (): void => {
    // Implement folder picker dialog here
    const newFolder = prompt('Enter folder path:', folderLocation);
    if (newFolder) {
      setFolderLocation(newFolder);
    }
  };

  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg w-[480px] max-h-[90vh]">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-1 text-cyan-500">
          New project
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          <span className="text-red-500">*</span> indicates a required field
        </p>

        <div className="p-2">
          <button
            onClick={handleImportClick}
            className="w-full text-left bg-zinc-700 hover:bg-zinc-500 rounded-md"
          >
            <div className="flex justify-center  items-center">
              <span className="text-cyan-500 font-semibold capitalize p-2">
                Import project
              </span>
            </div>
          </button>
          <p className="text-sm text-gray-400 mt-2">
            Import an existing project. It will automatically fill project
            details below.
          </p>
        </div>

        <div className="flex items-center my-2">
          <div className="border-t border-zinc-500 flex-grow"></div>
          <span className="px-4 text-gray-400">OR</span>
          <div className="border-t border-zinc-500 flex-grow"></div>
        </div>

        <form className="space-y-4">
          <div className="flex gap-4 items-center justify-center">
            <label className="block text-sm mb-1 text-cyan-500">
              <span className="text-cyan-500">*</span> Project name
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full flex-1 bg-zinc-900 border-zinc-800 rounded-md p-1 text-gray-400 focus:outline-none focus:border-cyan-600"
              required
            />
          </div>

          <div className="mt-6">
            <p className="text-sm text-cyan-500">Translate from</p>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <label className="inline-block text-sm mb-1 text-cyan-500">
              <span className="text-cyan-500">*</span> Source language
            </label>
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
              className="w-full bg-zinc-900 border-zinc-800 rounded-md p-2 text-gray-400 focus:outline-none focus:border-cyan-600"
              required
            >
              <option value="">Select language...</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <label className="block text-sm mb-1 text-cyan-500">
              <span className="text-cyan-500">*</span> Source document
            </label>
            <button
              type="button"
              onClick={() => document.getElementById('fileInput')?.click()}
              className="w-full bg-zinc-900 border-zinc-800 rounded-md p-2 text-left text-gray-400 hover:bg-zinc-800"
            >
              Choose File
            </button>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="mt-6">
            <p className="text-sm text-cyan-500">Translate into</p>
          </div>

          <div className="flex gap-4 items-center justify-center">
            <label className="block text-sm mb-1 text-cyan-500">
              <span className="text-cyan-500">*</span> Target language
            </label>
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="w-full bg-zinc-900 border-zinc-800 rounded-md p-2 text-gray-400 focus:outline-none focus:border-cyan-600"
              required
            >
              <option value="">Select language...</option>
              <option value="en">English</option>
              <option value="es">Spanish</option>
            </select>
          </div>
          {/* 
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2 text-cyan-500">
              Project's details
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Location on disk</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleChangeFolder}
                  className="text-cyan-500 text-sm hover:text-cyan-400"
                >
                  Change folder
                </button>
                <span className="text-gray-400">{defaultFolder}</span>
              </div>
            </div>
          </div> */}
        </form>
      </div>

      {/* Footer */}
      {/* <div className="flex justify-between p-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleCreateProject}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          disabled={
            !projectName ||
            !sourceLanguage ||
            !targetLanguage ||
            !sourceDocument
          }
        >
          Create project
        </button>
      </div> */}
    </div>
  );
};

export default ProjectImportForm;
