import React from '@theia/core/shared/react';

import { useState } from '@theia/core/shared/react';
import { BookOpen, ChevronDown } from 'lucide-react';

export default function NewProjectForm() {
  const [projectName, setProjectName] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [layout, setLayout] = useState('text');
  const [diskLocation, setDiskLocation] = useState(
    'C:\\Users\\me\\example-path'
  );
  const [onlineLocation, setOnlineLocation] = useState(
    'https://git.door43.org/example-repository.git'
  );
  const [sliderValue, setSliderValue] = useState(50);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSourceFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
    console.log({
      projectName,
      sourceLanguage,
      targetLanguage,
      sourceFile,
      layout,
      diskLocation,
      onlineLocation,
    });
  };

  return (
    <div className="text-foreground p-3">
      <div className="flex items-center justify-start mb-6 space-x-6 px-10">
        <h1 className="text-2xl font-bold text-foreground">New project</h1>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 border border-cyan-800 rounded-md text-[11px] font-medium bg-cyan-800 hover:bg-cyan-900 text-black"
        >
          <BookOpen className="h-4 w-4" />
          Import project
        </button>
      </div>
      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-muted mb-4">
          <span className="text-cyan-500">*</span> indicates a required field
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <label
              htmlFor="project-name"
              className="flex items-center text-sm font-medium w-32"
            >
              <span className="text-cyan-500 mr-1">*</span> Project name
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
              className="flex-1 px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-700"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm">Translate from</p>
            <div className="flex items-center gap-4">
              <label
                htmlFor="source-language"
                className="flex items-center text-sm font-medium w-32"
              >
                <span className="text-cyan-500 mr-1">*</span> Source language
              </label>
              <div className="relative flex-1">
                <select
                  id="source-language"
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-700 pr-8"
                >
                  <option value="" disabled>
                    Select language...
                  </option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label
                htmlFor="source-document"
                className="flex items-center text-sm font-medium w-32"
              >
                <span className="text-cyan-500 mr-1">*</span> Source document
              </label>
              <div className="flex gap-2 flex-1">
                <input
                  id="source-document"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById('source-document')?.click()
                  }
                  className="flex-1 px-3 py-2 text-left border border-border rounded-md bg-input text-foreground hover:bg-cyan-800/10"
                >
                  {sourceFile ? sourceFile.name : 'Choose file'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm">Translate into</p>
            <div className="flex items-center gap-4">
              <label
                htmlFor="target-language"
                className="flex items-center text-sm font-medium w-32"
              >
                <span className="text-cyan-500 mr-1">*</span> Target language
              </label>
              <div className="relative flex-1">
                <select
                  id="target-language"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-700 pr-8"
                >
                  <option value="" disabled>
                    Select language...
                  </option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm">Settings</p>
            <div className="flex items-start gap-4">
              <label className="text-sm font-medium w-32">
                <span className="text-cyan-500 mr-1">*</span> Layout
              </label>
              <div className="flex-1">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="text-translation"
                        name="layout"
                        value="text"
                        checked={layout === 'text'}
                        onChange={() => setLayout('text')}
                        className="h-4 w-4 border-border text-cyan-800 focus:ring-cyan-700"
                      />
                    </div>
                    <label htmlFor="text-translation" className="text-sm">
                      Text translation
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex items-center">
                      <input
                        type="radio"
                        id="audio-translation"
                        name="layout"
                        value="audio"
                        checked={layout === 'audio'}
                        onChange={() => setLayout('audio')}
                        className="h-4 w-4 border-border text-cyan-800 focus:ring-cyan-700"
                      />
                    </div>
                    <label htmlFor="audio-translation" className="text-sm">
                      Audio translation
                    </label>
                  </div>
                </div>
                <p className="text-sm text-muted mt-2">
                  How the project will first show. Layout can then be
                  personalised at any time.
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium w-32">
                  Location on disk
                </label>

                <div className="flex items-center gap-2 flex-1">
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1 text-sm border border-border rounded-md bg-input text-foreground hover:bg-cyan-800/10"
                  >
                    Change folder
                  </button>
                  <input
                    type="text"
                    value={diskLocation}
                    onChange={(e) => setDiskLocation(e.target.value)}
                    className="flex-1 h-8 px-2 py-1 text-sm border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 text-sm text-muted hover:text-cyan-600"
                  >
                    Restore Default
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-sm font-medium w-32">
                  Location online
                </label>
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    value={onlineLocation}
                    onChange={(e) => setOnlineLocation(e.target.value)}
                    className="flex-1 h-8 px-2 py-1 text-sm border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-cyan-700"
                  />
                  <button
                    type="button"
                    className="px-3 py-1 text-sm text-muted hover:text-cyan-600"
                  >
                    Restore Default
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4 border-t border-border">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-muted hover:text-cyan-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-cyan-800 text-black rounded-md hover:bg-cyan-900"
            >
              Create project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
