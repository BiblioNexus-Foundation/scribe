import React from "react";

import { Buttons as Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  IconBrandOnedrive,
  IconHistory,
  IconInfoCircle,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import type { Remote } from "@theia/git/lib/common";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { LastCommit } from "../utils/CloudSyncUtils";

interface RemoteCardProps {
  remotes: Remote[];
  onAdd: (remote: { name: string; url: string }) => void;
  onSync: (id: number) => void;
  onRemove: (id: number) => void;
  onHistory: (id: number) => void;
  lastCommit: LastCommit | null;
  settings: {
    autoSync: boolean;
    autoCommit: boolean;
    autoSyncInterval?: number;
    autoCommitInterval?: number;
  };
  onSettingsChange: (settings: {
    autoSync: boolean;
    autoCommit: boolean;
    autoSyncInterval?: number;
    autoCommitInterval?: number;
  }) => void;
}

export default function CloudSyncCard({
  remotes,
  onAdd,
  onSync,
  onRemove,
  onHistory,
  lastCommit,
  settings,
  onSettingsChange,
}: RemoteCardProps) {
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd({ name, url });
    setOpen(false);
  };

  console.log("CloudSyncCard::: remotes ", remotes);
  return (
    <Card className="z-[999999] w-full max-w-3xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-2xl font-bold">Remotes</CardTitle>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button size="sm">
              <IconPlus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-[99999]">
            <div className="z-[99999] grid gap-4">
              <form className="grid gap-2" onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    placeholder="origin"
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-2 h-8"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://github.com/theia-ide/theia-apps.git"
                    className="col-span-2 h-8"
                  />
                </div>
                <Button type="submit">Done</Button>
              </form>
            </div>
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent>
        {lastCommit && (
          <div className="text-md flex gap-2 pt-3 font-semibold">
            <span>Last Commit: </span>
            <span className="text-sm">{lastCommit.timestampRelative}</span>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Remote List</h3>
            {remotes.map((remote, idx) => (
              <div
                key={idx}
                className="text-foreground flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  <span className="text-foreground font-medium">{remote.name}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <IconInfoCircle className="text-foreground h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Push Link:{" "}
                          <a href={remote.push} target="_blank" className="text-blue-500">
                            {remote.push}
                          </a>
                        </p>
                        <p>
                          Fetch Link:{" "}
                          <a href={remote.fetch} target="_blank" className="text-blue-500">
                            {remote.fetch}
                          </a>
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => onSync(idx)}>
                    <IconBrandOnedrive className="h-4 w-4" />
                    <span className="sr-only">Sync</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onRemove(idx)}>
                    <IconTrash className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onHistory(idx)}>
                    <IconHistory className="h-4 w-4" />
                    <span className="sr-only">History</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-sync"
                  checked={settings.autoSync}
                  onCheckedChange={(checkedState: boolean) =>
                    onSettingsChange({
                      ...settings,
                      autoSync: checkedState,
                    })
                  }
                />
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="auto-sync"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Auto-sync remotes
                  </label>
                  {settings.autoSync && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        className="h-7 w-20"
                        value={settings.autoSyncInterval}
                        onChange={(e) =>
                          onSettingsChange({
                            ...settings,
                            autoSyncInterval: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                      <span className="text-foreground text-sm">seconds</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-commit"
                  checked={settings.autoCommit}
                  onCheckedChange={(checkedState: boolean) =>
                    onSettingsChange({
                      ...settings,
                      autoCommit: checkedState,
                    })
                  }
                />
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="auto-commit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Auto Commit
                  </label>
                  {settings.autoCommit && (
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        className="h-7 w-20"
                        value={settings.autoCommitInterval}
                        onChange={(e) =>
                          onSettingsChange({
                            ...settings,
                            autoCommitInterval: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                      <span className="text-foreground text-sm">seconds</span>
                    </div>
                  )}
                </div>
              </div>
              {/* <div className="flex items-center space-x-2">
                <Checkbox id="compression" />
                <label
                  htmlFor="compression"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Use compression
                </label>
              </div> */}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
