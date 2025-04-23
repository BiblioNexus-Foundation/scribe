import * as React from "react";
import {
  IconMicrophone,
  IconPlayerPause,
  IconPlayerPlay,
  IconRefresh,
  IconSettings,
  IconTrashX,
  IconPlayerStop,
} from "@tabler/icons-react";
import ButtonGroups from "scribe-ui/lib/components/ButtonGroup";
import Button from "scribe-ui/lib/components/Button";
import Waveform from "./player/Waveform";
import { useState, useEffect } from "@theia/core/shared/react";
import VolumeBar from "./player/VolumeBar";
import SelectDropdown from "./common/SelectDropdown";
import RealTimeWaveform from "./recorder/RealTimeWaveform";
import { AudioController } from "./recorder/AudioController";
import { FFmpegServer } from "../common/audio-protocol";

interface Option {
  label: string;
  value: string;
}
interface AudioPanelProps {
  theme: any;
  server: FFmpegServer;
  refValue: string;
}
const options = [
  { label: "1", value: 1.0 },
  { label: "1.5", value: 1.5 },
  { label: "2", value: 2.0 },
];
export const AudioPanel: React.FC<AudioPanelProps> = ({ theme, server, refValue }) => {
  const [volume, setVolume] = useState<number>(0.7);
  const [playbackSpeed, setPlaybackSpeed] = useState<{
    label: string;
    value: number;
  }>(options[0]);
  const [displayWave, setDisplayWave] = useState<string>("recorder");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentFile, setCurrentFile] = useState<string>("");
  const [audioController] = useState(() => new AudioController(server));
  const [control, setControl] = useState("");
  const [waveformState, setWaveformState] = useState("stop");
  const [currentOS, setCurrentOS] = useState("");
  const [devices, setDevices] = useState<Option[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Option | null>(null);
  const [bookName, setBookName] = useState<string>("");
  const [chapter, setChapter] = useState<string>("");
  const [verse, setVerse] = useState<string>("");

  useEffect(() => {
    const createDirectories = async () => {
      if (bookName) {
        try {
          await audioController.createFolders(bookName, chapter);
          console.log(`Folders created for: ${bookName}/${chapter}`);
        } catch (error) {
          console.error("Error creating folders:", error);
        }
      }
    };

    createDirectories();
  }, [bookName, chapter, audioController]);

  useEffect(() => {
    if (!refValue) return;
    const parts = refValue.split("/").slice(-3);
    if (parts.length === 3) {
      setBookName(parts[0]);
      setChapter(parts[1]);
      setVerse(parts[2]);
    }
  }, [refValue]);

  useEffect(() => {
    const getDevices = async () => {
      const listDevices = await server.getAudioDevices();
      const deviceOptions = listDevices.map((device) => ({
        label: device.name,
        value: device.alternativeName,
      }));
      setDevices(deviceOptions);
      if (deviceOptions.length > 0) {
        setSelectedDevice(deviceOptions[0]);
        server.setSelectedDevice(deviceOptions[0].value);
      }
    };

    if ((!devices || devices.length === 0) && currentOS === "win32") {
      getDevices();
    }
  }, [currentOS, devices, server]);

  const handlePlaybackControl = (control: string) => {
    if (!isRecording && currentFile) {
      setControl(control);
    }
  };

  const handlePauseResume = async () => {
    try {
      if (isRecording) {
        if (isPaused) {
          await audioController.resumeRecording();
          setIsPaused(false);
          setWaveformState("resume");
        } else {
          await audioController.pauseRecording();
          setIsPaused(true);
          setWaveformState("pause");
        }
      }
    } catch (error) {
      console.error("Pause/Resume error:", error);
    }
  };

  const handleStop = async () => {
    try {
      if (isRecording && !isPaused) {
        const filePath = await audioController.stopRecording();
        setIsRecording(false);
        setIsPaused(false);
        setWaveformState("stop");
        if (filePath) {
          setCurrentFile(filePath);
          setDisplayWave("player");
        }
      }
    } catch (error) {
      console.error("Stop recording error:", error);
    }
  };

  const handleRecord = async () => {
    try {
      if (!isRecording) {
        // Clear current file and set display to recorder mode
        setControl("stop");
        setDisplayWave("recorder");
        setWaveformState("stop"); // Reset waveform before starting

        // Start recording after a small delay to allow state updates
        setTimeout(async () => {
          await audioController.startRecording(bookName, chapter, verse);
          setIsRecording(true);
          setWaveformState("start");
        }, 100);
      }
    } catch (error) {
      console.error("Recording error:", error);
    }
  };

  const handleDelete = () => {
    if (currentFile) {
      server.deleteFile(currentFile);
      setCurrentFile("");
      setControl("stop");
      setDisplayWave("recorder");
    }
  };

  useEffect(() => {
    const getOS = async () => {
      const os = await server.getSystemOS();
      setCurrentOS(os);
    };
    if (!currentOS) {
      getOS();
    }
  }, [currentOS, server]);

  const getButtonClass = (isActive: boolean, isSelected: boolean = false): string => {
    if (!isActive) {
      return "rounded-lg opacity-50 cursor-not-allowed pointer-events-none";
    }

    if (isSelected) {
      return "rounded-lg bg-cyan-400 dark:bg-cyan-500 text-zinc-800 dark:text-zinc-50 transition-colors";
    }

    return "rounded-lg hover:bg-cyan-500 transition-colors";
  };

  // Determine button availability
  const canRecord = !isRecording;
  const canPauseOrResume = isRecording;
  const canStop = isRecording && !isPaused;
  const canPlayback = !isRecording && Boolean(currentFile);

  return (
    <div className="">
      <div>
        <ButtonGroups />
      </div>
      <div className="border-[rgb(250 250 250 / 0.1)] h-[30%] border-t">
        {displayWave === "recorder" ? (
          <RealTimeWaveform waveformState={waveformState} theme={theme} />
        ) : (
          <Waveform
            url={currentFile}
            control={control}
            theme={theme}
            setControl={setControl}
            volume={volume}
            speed={playbackSpeed.value}
          />
        )}
      </div>
      <div className="border-[rgb(250 250 250 / 0.1)] flex h-[30%] border-t">
        <div className="flex w-[20%] flex-col items-center justify-center gap-4 2xl:w-[15%]">
          <span className="text-[10px] font-medium uppercase leading-3 text-zinc-400 dark:text-zinc-500">
            Speed
          </span>
          <div className="h-8">
            <SelectDropdown
              options={options}
              selectedOption={playbackSpeed}
              setSelectedOption={setPlaybackSpeed}
            />
          </div>
        </div>
        <div className="h-7 w-[1px] bg-gray-300 dark:bg-zinc-700" style={{ marginTop: "24px" }} />
        <div className="flex w-[20%] justify-center gap-7 2xl:w-[15%]">
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
              {isRecording ? (isPaused ? "Resume" : "Pause") : "Record"}
            </p>
            <Button
              className={getButtonClass(canRecord || canPauseOrResume, isRecording && !isPaused)}
              onClick={isRecording ? handlePauseResume : handleRecord}
              icon={
                isRecording ? (
                  isPaused ? (
                    <IconPlayerPlay size={14} stroke={2} strokeLinejoin="miter" />
                  ) : (
                    <IconPlayerPause size={14} stroke={2} strokeLinejoin="miter" />
                  )
                ) : (
                  <IconMicrophone size={14} stroke={2} strokeLinejoin="miter" />
                )
              }
            />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
              Stop
            </p>
            <Button
              className={getButtonClass(canStop)}
              onClick={canStop ? handleStop : undefined}
              icon={<IconPlayerStop size={14} stroke={2} strokeLinejoin="miter" />}
            />
          </div>
        </div>
        <div className="h-7 w-[1px] bg-gray-300 dark:bg-zinc-700" style={{ marginTop: "24px" }} />
        <div className="flex w-[50%] justify-between gap-7 px-16 2xl:w-[40%]">
          <div className="space-y-2">
            {control === "play" ? (
              <>
                <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                  Pause
                </p>
                <Button
                  className={getButtonClass(canPlayback, true)}
                  icon={<IconPlayerPause size={14} stroke={2} strokeLinejoin="miter" />}
                  onClick={canPlayback ? () => handlePlaybackControl("pause") : undefined}
                />
              </>
            ) : (
              <>
                <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
                  Play
                </p>
                <Button
                  className={getButtonClass(canPlayback, control === "play")}
                  icon={<IconPlayerPlay size={14} stroke={2} strokeLinejoin="miter" />}
                  onClick={canPlayback ? () => handlePlaybackControl("play") : undefined}
                />
              </>
            )}
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
              Stop
            </p>
            <Button
              className={getButtonClass(canPlayback, control === "stop")}
              icon={<IconPlayerStop size={14} stroke={2} strokeLinejoin="miter" />}
              onClick={canPlayback ? () => handlePlaybackControl("stop") : undefined}
            />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
              Rewind
            </p>
            <Button
              className={getButtonClass(canPlayback)}
              icon={<IconRefresh size={14} stroke={2} strokeLinejoin="miter" />}
              onClick={canPlayback ? () => handlePlaybackControl("rewind") : undefined}
            />
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
              Delete
            </p>
            <Button
              className={getButtonClass(canPlayback)}
              icon={<IconTrashX size={14} stroke={2} strokeLinejoin="miter" />}
              onClick={canPlayback ? handleDelete : undefined}
            />
          </div>
          <div className="space-y-4">
            <VolumeBar volume={volume} setVolume={setVolume} />
          </div>
        </div>
        <div className="h-7 w-[1px] bg-gray-300 dark:bg-zinc-700" style={{ marginTop: "24px" }} />
        <div className="flex w-[15%] flex-col items-center gap-4 2xl:w-[10%]">
          <p className="text-[10px] font-medium uppercase text-zinc-400 dark:text-zinc-500">
            Settings
          </p>
          <div className="h-8">
            {currentOS === "win32" ? (
              <SelectDropdown
                options={devices || []}
                selectedOption={selectedDevice || { label: "Select device", value: "" }}
                setSelectedOption={(option: Option) => {
                  setSelectedDevice(option);
                  server.setSelectedDevice(option.value);
                }}
              />
            ) : (
              <IconSettings
                size={24}
                stroke={2}
                strokeLinejoin="miter"
                className="cursor-pointer text-zinc-500 hover:text-cyan-400 dark:text-zinc-50 dark:hover:text-cyan-400"
                onClick={() => server.openAudioSettings()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
