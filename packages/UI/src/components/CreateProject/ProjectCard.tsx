import React from '@theia/core/shared/react';
import {
  FileText,
  Volume2,
  Image,
  Film,
  Map,
  User,
  CloudUpload,
  MoreHorizontal,
} from 'lucide-react';

interface Project {
  name: string;
  sourceLang: string;
  sourceLangCode: string;
  targetLang: string;
  targetLangCode: string;
  lastUpdateBy: string;
  lastUpdateDate: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  activeDropdown: number | null;
  setActiveDropdown: (index: number | null) => void;
  onViewDetails?: () => void;
  onEditProject?: () => void;
  onDeleteProject?: () => void;
}

const ProjectCard = ({
  project,
  index,
  activeDropdown,
  setActiveDropdown,
  onViewDetails,
  onEditProject,
  onDeleteProject,
}: ProjectCardProps) => {
  return (
    <div
      key={index}
      className="bg-zinc-900 relative flex flex-col gap-3 border border-gray-700 rounded shadow p-4 min-w-[320px]"
    >
      {/* Card Header */}
      <div className="px-4">
        <h3 className="font-medium mb-2">{project.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{project.sourceLang}</span>
          <div className="rounded-full px-2 py-0 text-[10px] flex text-cyan-600 items-center justify-center bg-slate-600">
            {project.sourceLangCode}
          </div>
          <span>→</span>
          <span>{project.targetLang}</span>
          <div className="rounded-full px-2 py-0 text-[11px] flex text-cyan-600 items-center justify-center bg-slate-600">
            {project.targetLangCode}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="px-4 ">
        <div className="flex gap-2">
          {[FileText, Volume2, Image, Film, Map].map((Icon, i) => (
            <button
              key={i}
              className="w-10 h-5 p-1 flex items-center justify-center bg-gray-800 border border-gray-700 hover:bg-gray-700 rounded-full"
            >
              <Icon className="w-3 h-3" />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-2 mb-7">
          Add a description from project settings.
        </p>
      </div>

      {/* Card Footer */}
      <div className="px-4 flex items-center justify-between gap-4 flex-col">
        <div className="flex items-center gap-2 text-sm w-full justify-between">
          <div className="flex gap-2 flex-1 text-xs">
            <span>Last update by</span>
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs text-black font-medium">
              MA
            </div>
            <span>{project.lastUpdateBy}</span>
            <span>on</span>
            <span>{project.lastUpdateBy}</span>
          </div>
          <div className="text-[10px] flex items-center text-gray-300">
            {project.lastUpdateDate}
          </div>
        </div>

        <div className="flex items-center gap-2 justify-between w-full">
          <div className="flex gap-2">
            <button className="p-2 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700">
              <User className="w-4 h-4" />
            </button>
            <button className="p-2 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700">
              <CloudUpload className="w-4 h-4" />
            </button>

            {/* Dropdown */}
            <div className="relative">
              <button
                className="p-2 bg-gray-800 border border-gray-700 rounded hover:bg-gray-700"
                onClick={() =>
                  setActiveDropdown(activeDropdown === index ? null : index)
                }
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>

              {activeDropdown === index && (
                <div className="absolute right-0 top-full mt-1 bg-gray-800 border border-gray-700 rounded shadow-md min-w-40 z-10">
                  <div
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={onViewDetails}
                  >
                    View Details
                  </div>
                  <div
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={onEditProject}
                  >
                    Edit Project
                  </div>
                  <div
                    className="p-2 hover:bg-gray-700 cursor-pointer"
                    onClick={onDeleteProject}
                  >
                    Delete Project
                  </div>
                </div>
              )}
            </div>
          </div>

          <button className="px-3 py-2 text-sm bg-cyan-400 text-gray-900 rounded hover:bg-cyan-500">
            Open
          </button>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t rounded-l-lg from-cyan-400 to-transparent"
        style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
      ></div>
    </div>
  );
};

export default ProjectCard;
