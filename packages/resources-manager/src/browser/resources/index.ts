import { taResource } from "./ta";
import { tnResource } from "./tn";
import { tqResource } from "./tq";
import { twResource } from "./tw";
import { twlResource } from "./twl";
import type { ScribeResource } from "./types";
import { usfmBibleResource } from "./usfmBible";

export { tnResource } from "./tn";
export { twlResource } from "./twl";

export const registeredResources: ScribeResource[] = [
  twResource,
  tnResource,
  twlResource,
  taResource,
  tqResource,
];

export const resourcesGroups = [
  {
    id: "bible-group",
    name: "Bible",
    resources: [
      usfmBibleResource,
      twResource,
      tnResource,
      twlResource,
      taResource,
      tqResource,
    ],
  },
  {
    id: "obs-group",
    name: "Open Bible Stories",
    resources: [],
  },
  {
    id: "upload-group",
    name: "Upload",
    resources: [],
  },
];
