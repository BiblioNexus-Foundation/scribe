import { IconPlayerPlayFilled, IconMessage } from "@tabler/icons-react";
// import React = require('@theia/core/shared/react');

import * as React from "@theia/core/shared/react";
// import IconWaveForm from "../../src/icons/wave-form.svg";
// import IconVolume from "../../src/icons/volume.svg";
import { Badge } from "./ui/Badge";

export default function QuestionCard({
  isAudio,
  isImage,
}: {
  isAudio?: boolean;
  isImage?: boolean;
}) {
  return (
    <>
      {isAudio ? (
        <div className="bg-[var(rgba(66, 66, 71, 0.4))] border-[rgb(250 250 250 / 0.1)] relative space-y-3 rounded-3xl border px-5 py-3 font-normal">
          <Badge variant="rounded" className="z-5 absolute -left-4 -top-2">
            <IconMessage size={12} stroke={1.5} strokeLinejoin="miter" />
          </Badge>
          <div className="flex items-center justify-between text-sm font-normal text-zinc-400 dark:text-zinc-500">
            <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-cyan-400 text-zinc-800 dark:bg-cyan-500 dark:text-black">
              <IconPlayerPlayFilled size={18} stroke={2} strokeLinejoin="miter" />
            </span>
            {/* <IconWaveForm className="w-20 h-8 fill-zinc-500" /> */}
            <span className="leading-4 tracking-wide">0:05</span>
            {/* <IconVolume className="w-6 h-6 cursor-pointer fill-zinc-500" /> */}
          </div>
          <p className="text-[10px] leading-[14px] tracking-wide text-[var(--theia-settings-textInputForeground)]">
            Varius tellus fermentum blandit purus ornare magna. Vel pulvinar non felis pellentesque
            sit. Convallis mi habitant id risus tellus at.{" "}
          </p>
        </div>
      ) : isImage ? (
        <div className="bg-[var(rgba(66, 66, 71, 0.4))] border-[rgb(250 250 250 / 0.1)] relative space-y-3 rounded-3xl border px-5 py-3 font-normal">
          <Badge variant="rounded" className="z-5 absolute -left-4 -top-2">
            <IconMessage size={12} stroke={1.5} strokeLinejoin="miter" />
          </Badge>
          <span className="flex min-h-7 min-w-7 rounded-full">
            <img
              crossOrigin="anonymous"
              src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              alt="avatar"
              className="h-7 w-7 rounded-full object-cover"
            />{" "}
          </span>
          <div className="w-full space-y-1 text-[10px] font-normal text-[var(--theia-settings-textInputForeground)]">
            <span className="flex w-full justify-between font-medium uppercase leading-3">
              <span>Steve David</span>
              <span className="ml-auto">Mark 1:23</span>
            </span>

            <div className="question-image w-[20vw]] relative h-20">
              <img
                src="https://s3-alpha-sig.figma.com/img/7816/da5f/683281031f78c391503a0d387f6cc257?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=B50fDu5LHtplgGEHgjVgTgHCQzqT-PJoBIT-HiGdovD8vSar9sJiizBE5a79rX-PIPS0Iok-w8tV9VVkB3G1FnFLr22Z8FH~VnPfAdBd7X3mqWRCUFOl8WwpjMA7ifBVtddH~GRaOg5wcFAbKYeftwxTCfSPpM3qCI5oatLykui~BvUdh~LHwCRec48V1T~tpDdaVOt2U4mVkKuh-H4pDRnoRSKRFIQdIcQUdjyNk1f7BAWyhBhAucUOHrlJcCiQyo91KeEIEKNLhvYS8h5qyGjopvFqQ~MM~FxQgRdM-sd1abjptQsATe7K~WFAK52H~t-PcEQKq1Be1jZDnYRHYQ__"
                alt="org Image"
                className="h-full w-full rounded-[10px] object-cover"
              />
            </div>
            <p className="text-[10px] font-normal leading-[14px] tracking-wide text-[var(--theia-settings-textInputForeground)]">
              Example of picture
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-[var(rgba(66, 66, 71, 0.4))] border-[rgb(250 250 250 / 0.1)] relative space-y-3 rounded-3xl border px-5 py-3 font-normal">
          <Badge variant="rounded" className="z-5 absolute -left-4 -top-2">
            <IconMessage size={12} stroke={1.5} strokeLinejoin="miter" />
          </Badge>
          <span className="flex min-h-7 min-w-7 rounded-full">
            <img
              crossOrigin="anonymous"
              src="https://s3-alpha-sig.figma.com/img/3c9c/ccbe/cfad2b1fe9b00018a8247cefd2d118d1?Expires=1721606400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KmqDdEGr5flM0JFYAMQKOFxA31lT633z7JDTmgum9wrfedjycPqqUPZL6ba7rIJxIC6sKCQPdRTVSwqw~Lje~wwzfATDkBMtti9c8mS37VgihuWTp~7N9YouRZa1FpofcSRHyMcfjgkpl4~r~b45W8CwYPplSvVqoJMHGY3KJLLc-wKJeCpYoo6CVjqbNZ2O8Y819Ciu-fJzo~gbYXdjUX886tdoH98kDrQ6c5WiT44Z7wvn7Wfg01Yk0fLka9WIwVr8flv9ZdDMSjUvByl1JpYuZXmgFdltHjelNcXFNFArwzbUTSqrqJWBHZIjxao0JDxGG5fJACLTEHBo~3PWMw__"
              alt="avatar"
              className="h-7 w-7 rounded-full object-cover"
            />{" "}
          </span>
          <div className="w-full space-y-1 text-[10px] font-normal text-[var(--theia-settings-textInputForeground)]">
            <span className="flex w-full justify-between font-medium uppercase leading-3">
              <span>Brian Ineza</span>
              <span className="ml-auto">Mark 1:23</span>
            </span>

            <p className="text-[10px] font-normal leading-[14px] tracking-wide text-[var(--theia-settings-textInputForeground)]">
              Varius tellus fermentum blandit purus ornare magna. Vel pulvinar non felis
              pellentesque sit. Convallis mi habitant id risus tellus at.{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
