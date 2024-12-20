export interface Chapter {
  number: number;
}

export interface Book {
  id: string;
  name: string;
  chapters: Chapter[];
  isExpanded?: boolean;
  fileName?: string;
}
export const BIBLE_BOOKS: Book[] = [
  {
    id: "GEN",
    name: "Genesis",
    chapters: Array.from({ length: 50 }, (_, i) => ({ number: i + 1 })),
    fileName: "GEN.usfm",
  },
  {
    id: "EXO",
    name: "Exodus",
    chapters: Array.from({ length: 40 }, (_, i) => ({ number: i + 1 })),
    fileName: "EXO.usfm",
  },
  {
    id: "LEV",
    name: "Leviticus",
    chapters: Array.from({ length: 27 }, (_, i) => ({ number: i + 1 })),
    fileName: "LEV.usfm",
  },
  {
    id: "NUM",
    name: "Numbers",
    chapters: Array.from({ length: 36 }, (_, i) => ({ number: i + 1 })),
    fileName: "NUM.usfm",
  },
  {
    id: "DEU",
    name: "Deuteronomy",
    chapters: Array.from({ length: 34 }, (_, i) => ({ number: i + 1 })),
    fileName: "DEU.usfm",
  },
  {
    id: "JOS",
    name: "Joshua",
    chapters: Array.from({ length: 24 }, (_, i) => ({ number: i + 1 })),
    fileName: "JOS.usfm",
  },
  {
    id: "JDG",
    name: "Judges",
    chapters: Array.from({ length: 21 }, (_, i) => ({ number: i + 1 })),
    fileName: "JDG.usfm",
  },
  {
    id: "RUT",
    name: "Ruth",
    chapters: Array.from({ length: 4 }, (_, i) => ({ number: i + 1 })),
    fileName: "RUT.usfm",
  },
  {
    id: "1SA",
    name: "1 Samuel",
    chapters: Array.from({ length: 31 }, (_, i) => ({ number: i + 1 })),
    fileName: "1SA.usfm",
  },
  {
    id: "2SA",
    name: "2 Samuel",
    chapters: Array.from({ length: 24 }, (_, i) => ({ number: i + 1 })),
    fileName: "2SA.usfm",
  },
  {
    id: "1KI",
    name: "1 Kings",
    chapters: Array.from({ length: 22 }, (_, i) => ({ number: i + 1 })),
    fileName: "1KI.usfm",
  },
  {
    id: "2KI",
    name: "2 Kings",
    chapters: Array.from({ length: 25 }, (_, i) => ({ number: i + 1 })),
    fileName: "2KI.usfm",
  },
  {
    id: "1CH",
    name: "1 Chronicles",
    chapters: Array.from({ length: 29 }, (_, i) => ({ number: i + 1 })),
    fileName: "1CH.usfm",
  },
  {
    id: "2CH",
    name: "2 Chronicles",
    chapters: Array.from({ length: 36 }, (_, i) => ({ number: i + 1 })),
    fileName: "2CH.usfm",
  },
  {
    id: "EZR",
    name: "Ezra",
    chapters: Array.from({ length: 10 }, (_, i) => ({ number: i + 1 })),
    fileName: "EZR.usfm",
  },
  {
    id: "NEH",
    name: "Nehemiah",
    chapters: Array.from({ length: 13 }, (_, i) => ({ number: i + 1 })),
    fileName: "NEH.usfm",
  },
  {
    id: "EST",
    name: "Esther",
    chapters: Array.from({ length: 10 }, (_, i) => ({ number: i + 1 })),
    fileName: "EST.usfm",
  },
  {
    id: "JOB",
    name: "Job",
    chapters: Array.from({ length: 42 }, (_, i) => ({ number: i + 1 })),
    fileName: "JOB.usfm",
  },
  {
    id: "PSA",
    name: "Psalms",
    chapters: Array.from({ length: 150 }, (_, i) => ({ number: i + 1 })),
    fileName: "PSA.usfm",
  },
  {
    id: "PRO",
    name: "Proverbs",
    chapters: Array.from({ length: 31 }, (_, i) => ({ number: i + 1 })),
    fileName: "PRO.usfm",
  },
  {
    id: "ECC",
    name: "Ecclesiastes",
    chapters: Array.from({ length: 12 }, (_, i) => ({ number: i + 1 })),
    fileName: "ECC.usfm",
  },
  {
    id: "SNG",
    name: "Song of Solomon",
    chapters: Array.from({ length: 8 }, (_, i) => ({ number: i + 1 })),
    fileName: "SNG.usfm",
  },
  {
    id: "ISA",
    name: "Isaiah",
    chapters: Array.from({ length: 66 }, (_, i) => ({ number: i + 1 })),
    fileName: "ISA.usfm",
  },
  {
    id: "JER",
    name: "Jeremiah",
    chapters: Array.from({ length: 52 }, (_, i) => ({ number: i + 1 })),
    fileName: "JER.usfm",
  },
  {
    id: "LAM",
    name: "Lamentations",
    chapters: Array.from({ length: 5 }, (_, i) => ({ number: i + 1 })),
    fileName: "LAM.usfm",
  },
  {
    id: "EZK",
    name: "Ezekiel",
    chapters: Array.from({ length: 48 }, (_, i) => ({ number: i + 1 })),
    fileName: "EZK.usfm",
  },
  {
    id: "DAN",
    name: "Daniel",
    chapters: Array.from({ length: 12 }, (_, i) => ({ number: i + 1 })),
    fileName: "DAN.usfm",
  },
  {
    id: "HOS",
    name: "Hosea",
    chapters: Array.from({ length: 14 }, (_, i) => ({ number: i + 1 })),
    fileName: "HOS.usfm",
  },
  {
    id: "JOL",
    name: "Joel",
    chapters: Array.from({ length: 3 }, (_, i) => ({ number: i + 1 })),
    fileName: "JOL.usfm",
  },
  {
    id: "AMO",
    name: "Amos",
    chapters: Array.from({ length: 9 }, (_, i) => ({ number: i + 1 })),
    fileName: "AMO.usfm",
  },
  {
    id: "OBA",
    name: "Obadiah",
    chapters: Array.from({ length: 1 }, (_, i) => ({ number: i + 1 })),
    fileName: "OBA.usfm",
  },
  {
    id: "JON",
    name: "Jonah",
    chapters: Array.from({ length: 4 }, (_, i) => ({ number: i + 1 })),
    fileName: "JON.usfm",
  },
  {
    id: "MIC",
    name: "Micah",
    chapters: Array.from({ length: 7 }, (_, i) => ({ number: i + 1 })),
    fileName: "MIC.usfm",
  },
  {
    id: "NAM",
    name: "Nahum",
    chapters: Array.from({ length: 3 }, (_, i) => ({ number: i + 1 })),
    fileName: "NAM.usfm",
  },
  {
    id: "HAB",
    name: "Habakkuk",
    chapters: Array.from({ length: 3 }, (_, i) => ({ number: i + 1 })),
    fileName: "HAB.usfm",
  },
  {
    id: "ZEP",
    name: "Zephaniah",
    chapters: Array.from({ length: 3 }, (_, i) => ({ number: i + 1 })),
    fileName: "ZEP.usfm",
  },
  {
    id: "HAG",
    name: "Haggai",
    chapters: Array.from({ length: 2 }, (_, i) => ({ number: i + 1 })),
    fileName: "HAG.usfm",
  },
  {
    id: "ZEC",
    name: "Zechariah",
    chapters: Array.from({ length: 14 }, (_, i) => ({ number: i + 1 })),
    fileName: "ZEC.usfm",
  },
  {
    id: "MAL",
    name: "Malachi",
    chapters: Array.from({ length: 4 }, (_, i) => ({ number: i + 1 })),
    fileName: "MAL.usfm",
  },
  {
    id: "MAT",
    name: "Matthew",
    chapters: Array.from({ length: 28 }, (_, i) => ({ number: i + 1 })),
    fileName: "MAT.usfm",
  },
  {
    id: "MRK",
    name: "Mark",
    chapters: Array.from({ length: 16 }, (_, i) => ({ number: i + 1 })),
    fileName: "MRK.usfm",
  },
  {
    id: "LUK",
    name: "Luke",
    chapters: Array.from({ length: 24 }, (_, i) => ({ number: i + 1 })),
    fileName: "LUK.usfm",
  },
  {
    id: "JHN",
    name: "John",
    chapters: Array.from({ length: 21 }, (_, i) => ({ number: i + 1 })),
    fileName: "JHN.usfm",
  },
  {
    id: "ACT",
    name: "Acts",
    chapters: Array.from({ length: 28 }, (_, i) => ({ number: i + 1 })),
    fileName: "ACT.usfm",
  },
  {
    id: "ROM",
    name: "Romans",
    chapters: Array.from({ length: 16 }, (_, i) => ({ number: i + 1 })),
    fileName: "ROM.usfm",
  },
  {
    id: "1CO",
    name: "1 Corinthians",
    chapters: Array.from({ length: 16 }, (_, i) => ({ number: i + 1 })),
    fileName: "1CO.usfm",
  },
  {
    id: "2CO",
    name: "2 Corinthians",
    chapters: Array.from({ length: 13 }, (_, i) => ({ number: i + 1 })),
    fileName: "2CO.usfm",
  },
  {
    id: "GAL",
    name: "Galatians",
    chapters: Array.from({ length: 6 }, (_, i) => ({ number: i + 1 })),
    fileName: "GAL.usfm",
  },
  {
    id: "EPH",
    name: "Ephesians",
    chapters: Array.from({ length: 6 }, (_, i) => ({ number: i + 1 })),
    fileName: "EPH.usfm",
  },
  {
    id: "PHP",
    name: "Philippians",
    chapters: Array.from({ length: 4 }, (_, i) => ({ number: i + 1 })),
    fileName: "PHP.usfm",
  },
  {
    id: "COL",
    name: "Colossians",
    chapters: Array.from({ length: 4 }, (_, i) => ({ number: i + 1 })),
    fileName: "COL.usfm",
  },
  {
    id: "1TH",
    name: "1 Thessalonians",
    chapters: Array.from({ length: 5 }, (_, i) => ({ number: i + 1 })),
    fileName: "1TH.usfm",
  },
  {
    id: "2TH",
    name: "2 Thessalonians",
    chapters: Array.from({ length: 3 }, (_, i) => ({ number: i + 1 })),
    fileName: "2TH.usfm",
  },
  {
    id: "1TI",
    name: "1 Timothy",
    chapters: Array.from({ length: 6 }, (_, i) => ({ number: i + 1 })),
    fileName: "1TI.usfm",
  },
  {
    id: "2TI",
    name: "2 Timothy",
    chapters: Array.from({ length: 4 }, (_, i) => ({ number: i + 1 })),
    fileName: "2TI.usfm",
  },
  {
    id: "TIT",
    name: "Titus",
    chapters: Array.from({ length: 3 }, (_, i) => ({ number: i + 1 })),
    fileName: "TIT.usfm",
  },
  {
    id: "PHM",
    name: "Philemon",
    chapters: Array.from({ length: 1 }, (_, i) => ({ number: i + 1 })),
    fileName: "PHM.usfm",
  },
  {
    id: "HEB",
    name: "Hebrews",
    chapters: Array.from({ length: 13 }, (_, i) => ({ number: i + 1 })),
    fileName: "HEB.usfm",
  },
  {
    id: "JAS",
    name: "James",
    chapters: Array.from({ length: 5 }, (_, i) => ({ number: i + 1 })),
    fileName: "JAS.usfm",
  },
  {
    id: "1PE",
    name: "1 Peter",
    chapters: Array.from({ length: 5 }, (_, i) => ({ number: i + 1 })),
    fileName: "1PE.usfm",
  },
  {
    id: "2PE",
    name: "2 Peter",
    chapters: Array.from({ length: 3 }, (_, i) => ({ number: i + 1 })),
    fileName: "2PE.usfm",
  },
  {
    id: "1JN",
    name: "1 John",
    chapters: Array.from({ length: 5 }, (_, i) => ({ number: i + 1 })),
    fileName: "1JN.usfm",
  },
  {
    id: "2JN",
    name: "2 John",
    chapters: Array.from({ length: 1 }, (_, i) => ({ number: i + 1 })),
    fileName: "2JN.usfm",
  },
  {
    id: "3JN",
    name: "3 John",
    chapters: Array.from({ length: 1 }, (_, i) => ({ number: i + 1 })),
    fileName: "3JN.usfm",
  },
  {
    id: "JUD",
    name: "Jude",
    chapters: Array.from({ length: 1 }, (_, i) => ({ number: i + 1 })),
    fileName: "JUD.usfm",
  },
  {
    id: "REV",
    name: "Revelation",
    chapters: Array.from({ length: 22 }, (_, i) => ({ number: i + 1 })),
    fileName: "REV.usfm",
  },
];
