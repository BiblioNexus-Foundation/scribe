declare module "font-detect-rhl" {
  export interface Font {
    name: string;
    style: string;
    weight: string;
  }

  export const fontList: string[];

  export function useDetectFonts(options: { fonts: string[] }): Font[];
}
