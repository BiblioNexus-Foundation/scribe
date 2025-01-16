import React from "@theia/core/shared/react";
import AdvancedSettings from "./AdvancedSettings";
import Button from "./Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/Collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../components/ui/DropdownMenu";
import {
  ChevronRight,
  PlusIcon,
  Speaker,
  BookOpen,
  MenuSquare,
  ImageIcon,
  CircleAlert,
  ChevronsUpDown,
} from "lucide-react";
interface initialProjectData {
  ProjectName: string;
  Abbreviation: string;
  Description: string;
  Language: string;
  ProjectFilePath: any;
}
const initialProjectData: initialProjectData = {
  ProjectName: "",
  Abbreviation: "",
  Description: "",
  Language: "english",
  ProjectFilePath: "",
};
interface ProjectSettings {
  scope: string;
  versification: string;
  license: string;
}

interface ProjectData {
  ProjectName: string;
  Abbreviation: string;
  Description: string;
  Language: string;
  ProjectFilePath: any;
}

interface CreateProjectProps {
  activeDropdown: boolean;
  activeBooks: string;
  settings: ProjectSettings;
  projectData: ProjectData;

  setActiveDropdown: (value: boolean) => void;
  setActiveBooks: (value: string) => void;
  handleSettingsChange: (key: keyof ProjectSettings, value: string) => void;
  handleInputChange: (key: keyof ProjectData, value: any) => void;
  handleSubmit: (e: React.FormEvent) => void;
  onFileSelect: (file: File) => void;

  supportedLanguages?: Array<{ code: string; name: string }>;
  projectTypes?: Array<{ label: string; icon: React.ComponentType }>;
}
const CreateProjectComponents = ({
  activeDropdown,
  activeBooks,
  settings,
  projectData,

  setActiveDropdown,
  setActiveBooks,
  handleSettingsChange,
  handleInputChange,
  handleSubmit,
  onFileSelect,

  supportedLanguages = [
    { code: "eng", name: "English" },
    { code: "fr", name: "French" },
    { code: "swh", name: "Swahili" },
  ],
  projectTypes = [
    { label: "Bible translation", icon: MenuSquare },
    { label: "Audio", icon: Speaker },
    { label: "OBS", icon: ImageIcon },
    { label: "Juta", icon: BookOpen },
  ],
}: CreateProjectProps) => {
  return (
    <div className="mx-10 my-5 border p-5 rounded-lg border-zinc-900">
      <div className="w-9/12">
        <div className="flex-col mb-3">
          <p className="text-cyan-600 mb-2 text-sm ml-2">
            Project Type : <span>{activeBooks}</span>
          </p>
          <DropdownMenu onOpenChange={setActiveDropdown}>
            <DropdownMenuTrigger className="border-none">
              <div className="flex py-2 justify-center items-center gap-2 rounded-md px-2 bg-cyan-950 text-cyan-500">
                <p className="uppercase text-xs">{activeBooks}</p>
                <ChevronRight
                  height={15}
                  width={15}
                  className={`ml-auto transition-transform ${
                    activeDropdown ? "rotate-90" : "rotate-0"
                  }`}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 border border-zinc-900 w-[15rem] bg-black mt-2">
              <div className="grid grid-cols-2 gap-0">
                {projectTypes.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    onClick={() => setActiveBooks(label)}
                    className={`flex flex-col gap-2 items-center justify-center p-4 border border-zinc-900 hover:bg-cyan-900 hover:text-cyan-500 ${
                      activeBooks === label ? "bg-cyan-950" : "bg-zinc-950"
                    }`}
                  >
                    <Icon />
                    <p className="text-[10px]">{label}</p>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-1/2">
          <div className="flex justify-between items-center gap-5 rounded-md px-2">
            {[
              {
                label: "Project Name*",
                name: "ProjectName",
                placeholder: "Enter Project Name",
              },
              { label: "Abbreviation*", name: "Abbreviation", placeholder: "" },
            ].map(({ label, name, placeholder }) => (
              <div key={name} className="flex-1">
                <p className="text-cyan-600 mb-2 text-sm">{label}</p>
                <input
                  onChange={(e) =>
                    handleInputChange(
                      name as keyof typeof initialProjectData,
                      e.target.value
                    )
                  }
                  type="text"
                  placeholder={placeholder}
                  className="w-full rounded-sm outline-none p-2 bg-zinc-900 text-[12px] text-gray-400"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between gap-5 rounded-md px-2 mt-4 mb-2">
            <div className="flex-1">
              <p className="text-cyan-600 mb-2 text-sm">Description*</p>
              <textarea
                onChange={(e) =>
                  handleInputChange("Description", e.target.value)
                }
                placeholder="Enter Project Description"
                className="w-full rounded-sm outline-none p-1 px-2 bg-zinc-900 h-[130px] text-[12px] text-gray-400"
              />
            </div>
            <div className="flex-1 flex-col flex gap-4">
              <div className="flex gap-2 items-center">
                <p className="text-cyan-600 text-sm">Target Language*</p>
                <span className="uppercase bg-cyan-900 px-2 text-center flex items-center justify-center rounded-lg text-[10px] h-[20px]">
                  ltr
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <select
                  value={projectData.Language}
                  onChange={(e) =>
                    handleInputChange("Language", e.target.value)
                  }
                  className="w-2/3 rounded-md bg-zinc-900 px-2 py-1 uppercase text-[12px] outline-none"
                >
                  {supportedLanguages.map((el, index) => (
                    <option value={el.name} key={index}>
                      {el.code}
                    </option>
                  ))}
                </select>
                <CircleAlert size={20} />
                <Button
                  onClick={(e) => e.preventDefault()}
                  className="dark:bg-cyan-950 rounded-full w-8 h-8 border-none dark:hover:bg-gray-900"
                  icon={<PlusIcon size={20} />}
                />
              </div>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={(e: any) => {
                    handleInputChange("ProjectFilePath", e.target.files[0]);
                  }}
                />

                <label
                  htmlFor="fileInput"
                  className="bg-cyan-950 rounded-full w-28 border  hover:bg-gray-900 flex items-center justify-center cursor-pointer"
                >
                  <p
                  //  className="border rounded-md px-2 text-[10px] w-10 bg-cyan-950"
                  >
                    import book
                  </p>
                </label>
              </div>
            </div>
          </div>

          <Collapsible className="group/collapsible w-full">
            <CollapsibleTrigger className="justify-between border-b text-cyan-500 w-1/2 border-zinc-900 cursor-pointer p-2 flex items-center">
              Advanced Settings
              <ChevronsUpDown
                height={15}
                width={15}
                className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <AdvancedSettings
                settings={settings}
                onChange={handleSettingsChange}
              />
            </CollapsibleContent>
          </Collapsible>

          <button
            type="submit"
            className="border-none p-2 px-10 rounded-md text-cyan-500 uppercase bg-cyan-950 mt-4 dark:hover:bg-gray-900"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectComponents;
