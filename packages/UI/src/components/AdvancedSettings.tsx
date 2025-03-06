import React from "@theia/core/shared/react";
import Button from "./Button";
import { FileEditIcon } from "lucide-react";

export type SettingsType = {
  scope: string;
  versification: string;
  license: string;
};

interface AdvancedSettingsProps {
  settings: SettingsType;
  onChange: (key: keyof SettingsType, value: string) => void;
}

const AdvancedSettings: React.FC<AdvancedSettingsProps> = ({
  settings,
  onChange,
}) => {
  const { scope, versification, license } = settings;

  const scopes = [
    "All books",
    "old testment (ot)",
    "new testment (nt)",
    "custom",
  ];

  return (
    <div className="w-full mt-2">
      <div className="flex-col gap-3 flex">
        {/* Scope Section */}
        <div className="flex gap-3">
          <p className="capitalize text-cyan-500 text-[12px]">scope *</p>
          <div className="px-2 p-1 bg-gray-700 rounded-full text-[10px] font-semibold">
            66 books
          </div>
        </div>

        <div className="flex gap-2">
          {scopes.map((item) => (
            <Button
              key={item}
              label={item}
              className={`px-3 border-none flex items-center justify-center h-[20px] ${
                scope === item ? "text-cyan-500 bg-cyan-950" : "text-zinc-400"
              } uppercase rounded-full text-[10px] font-semibold`}
              onClick={(e) => {
                e.preventDefault();
                onChange("scope", item);
              }}
            />
          ))}
        </div>

        {/* Versification Section */}
        <div className="flex gap-3 flex-col">
          <p className="text-cyan-500 text-[12px] capitalize">
            versification scheme*
          </p>
          <select
            name="Language"
            value={versification}
            onChange={(e) => onChange("versification", e.target.value)}
            className="w-1/6 bg-gray-900 px-2 py-1 uppercase text-[12px] outline-none"
          >
            <option value="eng">new </option>
            <option value="fr">two</option>
            <option value="swh">four</option>
          </select>
        </div>

        {/* License Section */}
        <div className="flex gap-3 flex-col gap-2">
          <p className="text-cyan-500 text-[12px] capitalize">License*</p>
          <div className="flex gap-2">
            <select
              name="License"
              value={license}
              onChange={(e) => onChange("license", e.target.value)}
              className="w-1/6 bg-gray-900 px-2 py-1 uppercase text-[12px] outline-none"
            >
              <option value="cc by-sa">cc by-sa</option>
              <option value="dd cg-y7">dd cg-y7</option>
              <option value="xy gv-b6">xy gv-b6</option>
            </select>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e: any) => console.log(e.target.files[0])}
            />

            <label
              htmlFor="fileInput"
              className="bg-cyan-950 rounded-full w-8 h-8 border-none hover:bg-gray-900 flex items-center justify-center cursor-pointer"
            >
              <FileEditIcon size={20} strokeLinejoin="miter" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;
