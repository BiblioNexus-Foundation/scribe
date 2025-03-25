'use client';

import React from '@theia/core/shared/react';
import { useState } from 'react';
import {
  Grid3x3,
  List,
  MoreHorizontal,
  Plus,
  Volume2,
  Settings,
  Film,
  X,
  Image,
  Map,
  Speaker,
  User,
  CloudUpload,
  ArrowDownAZ,
} from 'lucide-react';
import ProjectCard from './ProjectCard';
import WelcomeCard from './welcome-card';

export default function ProjectGrid() {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  const projects = Array(4).fill({
    name: 'fraLSG1910eb_teamA_first-try',
    sourceLang: 'English',
    sourceLangCode: 'eng',
    targetLang: 'French',
    targetLangCode: 'fra',
    lastUpdateBy: 'Maria',
    lastUpdateDate: '02/19/25 04:30',
  });

  return (
    <div className=" text-white min-h-screen">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl   font-bold">Projects</h1>
            <button className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded hover:bg-gray-700">
              <Plus className="w-4 h-4" />
              New project
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 hover:text-cyan-500 cursor-pointer">
              <p className="text-sm">Alphabetical</p>
              <ArrowDownAZ className="w-4 h-4" />
            </div>
            <button className="p-2 text-sm bg-gray-800 border border-gray-700 rounded hover:bg-gray-700">
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button className="p-2 text-sm bg-gray-800 border border-gray-700 rounded hover:bg-gray-700">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.length > 0 ? (
            projects.map((project, i) => (
              <ProjectCard
                project={project}
                index={i}
                activeDropdown={activeDropdown}
                setActiveDropdown={setActiveDropdown}
                onViewDetails={() => console.log('View Details')}
                onEditProject={() => console.log('Edit Project')}
                onDeleteProject={() => console.log('Delete Project')}
              />
            ))
          ) : (
            <WelcomeCard />
          )}

          {/* New Project Card */}
          <div className="flex items-center min-h-[200px] justify-center  bg-zinc-900 border border-dashed border-gray-700 rounded">
            <button className="flex items-center text-white font-bold text-xl gap-2 px-3 py-2   hover:text-cyan-500">
              <Plus className="w-4 h-4" />
              New project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
