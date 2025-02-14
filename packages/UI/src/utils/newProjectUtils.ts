import { nonCanonicalBookRefs, vrefData } from "../functions/Constant";

export function getAllBookRefs(): string[] {
  return Object.keys(vrefData).filter(
    (ref) => !nonCanonicalBookRefs.includes(ref)
  );
}
