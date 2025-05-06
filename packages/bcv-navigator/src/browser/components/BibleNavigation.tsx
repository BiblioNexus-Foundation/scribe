import { useState, useEffect, useRef } from "react";
import React = require("react");
import versification from "../Assets/versification.json";
import { VerseRefUtils } from "@scribe/theia-utils/lib/browser";

interface TheiaTheme {
  id: string;
  type: string;
  label: string;
}

interface TheiaThemeService {
  getCurrentTheme(): TheiaTheme;
  onThemeChange(callback: (theme: TheiaTheme) => void): { dispose: () => void };
}

// Scope interface
interface Scope {
  [key: string]: any[];
}

// LocalStorage interface
interface BibleNavState {
  book_abbr: string;
  book_name: string;
  chapter: number;
  verse: number;
}

// Add VerseRef interfaces from your code
export interface VerseRefValue {
  book: string;
  chapter: number;
  verse: number;
}

interface NavigationProps {
  showPrevChapter?: boolean;
  showPrevVerse?: boolean;
  showNextVerse?: boolean;
  showNextChapter?: boolean;
  showBookChapter?: boolean;
  scope?: Scope;
  verseRefUtils?: VerseRefUtils;
}

interface VersificationData {
  maxVerses: Record<string, string[]>;
}

const fullBibleScope: Scope = {
  GEN: [],
  EXO: [],
  LEV: [],
  NUM: [],
  DEU: [],
  JOS: [],
  JDG: [],
  RUT: [],
  "1SA": [],
  "2SA": [],
  "1KI": [],
  "2KI": [],
  "1CH": [],
  "2CH": [],
  EZR: [],
  NEH: [],
  EST: [],
  JOB: [],
  PSA: [],
  PRO: [],
  ECC: [],
  SNG: [],
  ISA: [],
  JER: [],
  LAM: [],
  EZK: [],
  DAN: [],
  HOS: [],
  JOL: [],
  AMO: [],
  OBA: [],
  JON: [],
  MIC: [],
  NAM: [],
  HAB: [],
  ZEP: [],
  HAG: [],
  ZEC: [],
  MAL: [],
  MAT: [],
  MRK: [],
  LUK: [],
  JHN: [],
  ACT: [],
  ROM: [],
  "1CO": [],
  "2CO": [],
  GAL: [],
  EPH: [],
  PHP: [],
  COL: [],
  "1TH": [],
  "2TH": [],
  "1TI": [],
  "2TI": [],
  TIT: [],
  PHM: [],
  HEB: [],
  JAS: [],
  "1PE": [],
  "2PE": [],
  "1JN": [],
  "2JN": [],
  "3JN": [],
  JUD: [],
  REV: [],
};

// Book name mapping
const bookNameMapping: { [key: string]: string } = {
  // Old Testament
  GEN: "Genesis",
  EXO: "Exodus",
  LEV: "Leviticus",
  NUM: "Numbers",
  DEU: "Deuteronomy",
  JOS: "Joshua",
  JDG: "Judges",
  RUT: "Ruth",
  "1SA": "1 Samuel",
  "2SA": "2 Samuel",
  "1KI": "1 Kings",
  "2KI": "2 Kings",
  "1CH": "1 Chronicles",
  "2CH": "2 Chronicles",
  EZR: "Ezra",
  NEH: "Nehemiah",
  EST: "Esther",
  JOB: "Job",
  PSA: "Psalms",
  PRO: "Proverbs",
  ECC: "Ecclesiastes",
  SNG: "Song of Solomon",
  ISA: "Isaiah",
  JER: "Jeremiah",
  LAM: "Lamentations",
  EZK: "Ezekiel",
  DAN: "Daniel",
  HOS: "Hosea",
  JOL: "Joel",
  AMO: "Amos",
  OBA: "Obadiah",
  JON: "Jonah",
  MIC: "Micah",
  NAM: "Nahum",
  HAB: "Habakkuk",
  ZEP: "Zephaniah",
  HAG: "Haggai",
  ZEC: "Zechariah",
  MAL: "Malachi",
  // New Testament
  MAT: "Matthew",
  MRK: "Mark",
  LUK: "Luke",
  JHN: "John",
  ACT: "Acts",
  ROM: "Romans",
  "1CO": "1 Corinthians",
  "2CO": "2 Corinthians",
  GAL: "Galatians",
  EPH: "Ephesians",
  PHP: "Philippians",
  COL: "Colossians",
  "1TH": "1 Thessalonians",
  "2TH": "2 Thessalonians",
  "1TI": "1 Timothy",
  "2TI": "2 Timothy",
  TIT: "Titus",
  PHM: "Philemon",
  HEB: "Hebrews",
  JAS: "James",
  "1PE": "1 Peter",
  "2PE": "2 Peter",
  "1JN": "1 John",
  "2JN": "2 John",
  "3JN": "3 John",
  JUD: "Jude",
  REV: "Revelation",
};

interface VersificationData {
  maxVerses: {
    [bookAbbreviation: string]: string[];
  };
}

interface BibleBooks {
  [bookAbbr: string]: {
    fullName: string;
    chapters: number;
  };
}

interface BibleStructure {
  "Old Testament": BibleBooks;
  "New Testament": BibleBooks;
}
const oldTestamentBooks = [
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
];
const newTestamentBooks = [
  "MAT",
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
];

const extractBibleBooks = (
  versificationData: VersificationData,
  currentScope: Scope
): BibleStructure => {
  const oldTestament: BibleBooks = {};
  const newTestament: BibleBooks = {};

  // Filter books based on provided scope
  const scopedBooks = Object.keys(currentScope);

  for (const [book, chapters] of Object.entries(versificationData.maxVerses)) {
    // Skip books not in scope
    if (!scopedBooks.includes(book)) continue;

    const bookAbbr = book;
    const chapterCount = chapters.length;
    const fullName = bookNameMapping[bookAbbr] || bookAbbr;

    if (oldTestamentBooks.includes(bookAbbr)) {
      oldTestament[bookAbbr] = {
        fullName,
        chapters: chapterCount,
      };
    } else if (newTestamentBooks.includes(bookAbbr)) {
      newTestament[bookAbbr] = {
        fullName,
        chapters: chapterCount,
      };
    }
  }

  return {
    "Old Testament": oldTestament,
    "New Testament": newTestament,
  };
};

const BibleNavigation: React.FC<NavigationProps> = ({
  showPrevChapter = false,
  showPrevVerse = false,
  showNextVerse = false,
  showNextChapter = false,
  showBookChapter = false,
  scope = fullBibleScope,
  verseRefUtils = undefined, // Add VerseRefUtils with default value
}) => {
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [expandedBook, setExpandedBook] = useState<string | null>(null);
  const [tempSelectedBook, setTempSelectedBook] = useState<string | null>(null);
  const bookRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [availableBooks, setAvailableBooks] = useState<string[]>([]);
  const [selectedBookAbbr, setSelectedBookAbbr] = useState<string>("");
  const [currentVerse, setCurrentVerse] = useState<number>(1);
  // const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean | undefined>(undefined);

  // Flag to prevent triggering infinite update loops
  const isUpdatingFromVerseRef = useRef<boolean>(false);

  // Add state to track whether verse navigation is active
  const isVerseNavigation = showNextVerse && showPrevVerse;

  const bibleBooks = React.useMemo(
    () => extractBibleBooks(versification as VersificationData, scope),
    [scope]
  );

  // Effect to detect dark mode changes

  useEffect(() => {
    // Try to detect if we're in a Theia environment
    const isTheiaEnvironment =
      (typeof window !== "undefined" && (window as any).theia !== undefined) ||
      document.body.classList.contains("theia-app");

    if (isTheiaEnvironment && (window as any).theia?.services?.themeService) {
      // Access Theia theme service directly
      const themeService = (window as any).theia.services.themeService as TheiaThemeService;

      // Function to check theme
      const checkTheiaTheme = () => {
        try {
          const currentTheme = themeService.getCurrentTheme();
          const isDark =
            currentTheme.type === "dark" ||
            currentTheme.id.includes("dark") ||
            currentTheme.label.toLowerCase().includes("dark");

          console.debug("Theia theme detected:", currentTheme.label, isDark ? "dark" : "light");
          console.log("Theia theme detected:", currentTheme.label, isDark ? "dark" : "light");

          setIsDarkMode(isDark);
        } catch (err) {
          console.error("Error accessing Theia theme:", err);
          fallbackThemeDetection();
        }
      };

      // Initial theme check
      checkTheiaTheme();

      // Listen for theme changes
      try {
        const themeListener = themeService.onThemeChange((theme: TheiaTheme) => {
          const isDark =
            theme.type === "dark" ||
            theme.id.includes("dark") ||
            theme.label.toLowerCase().includes("dark");
          setIsDarkMode(isDark);
        });

        return () => {
          // Clean up the listener when component unmounts
          if (themeListener && typeof themeListener.dispose === "function") {
            themeListener.dispose();
          }
        };
      } catch (err) {
        console.error("Could not listen for Theia theme changes:", err);
        // If we can't listen for changes, set up fallback
        fallbackThemeDetection();
      }
    } else {
      // If Theia API not available, use fallback method
      fallbackThemeDetection();
    }

    // Fallback detection method using DOM and CSS
    function fallbackThemeDetection() {
      console.debug("Using fallback theme detection");

      const checkDarkMode = () => {
        // Check for common dark theme classes
        const hasTheiaDarkClass =
          document.body.classList.contains("theia-dark") ||
          document.documentElement.classList.contains("theia-dark");

        const hasVSCodeDarkClass =
          document.body.classList.contains("vscode-dark") ||
          document.body.classList.contains("vs-dark");

        const hasDataThemeDark = document.body.getAttribute("data-theme") === "dark";

        // Check computed styles
        const computedStyle = window.getComputedStyle(document.body);
        const backgroundColor = computedStyle.backgroundColor;

        // Check if background is dark
        let isDarkBackground = false;
        if (backgroundColor) {
          // Parse RGB values
          const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (rgbMatch) {
            const [r, g, b] = [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
            // Calculate perceived brightness
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            isDarkBackground = brightness < 128; // Less than 128 is considered dark
          }
        }

        const isDark =
          hasTheiaDarkClass || hasVSCodeDarkClass || hasDataThemeDark || isDarkBackground;

        setIsDarkMode(isDark);
      };

      // Delay initial check slightly
      const initialCheckTimeout = setTimeout(() => {
        checkDarkMode();
      }, 100);

      // Set up observer for theme changes
      const observer = new MutationObserver(() => {
        checkDarkMode();
      });

      // Start observing document and body
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "data-theme"],
      });

      return () => {
        clearTimeout(initialCheckTimeout);
        observer.disconnect();
      };
    }
  }, []);

  // Initialize from VerseRefUtils when available
  useEffect(() => {
    if (verseRefUtils) {
      // Load initial verse reference
      verseRefUtils.getVerseRef().then((verseRef) => {
        isUpdatingFromVerseRef.current = true;
        setSelectedBookAbbr(verseRef.book);
        setCurrentChapter(verseRef.chapter);
        setCurrentVerse(verseRef.verse);
        isUpdatingFromVerseRef.current = false;
      });

      // Subscribe to verse reference changes
      verseRefUtils.onVerseRefChange((verseRef) => {
        isUpdatingFromVerseRef.current = true;
        setSelectedBookAbbr(verseRef.book);
        setCurrentChapter(verseRef.chapter);
        setCurrentVerse(verseRef.verse);
        isUpdatingFromVerseRef.current = false;
      });
    }
  }, [verseRefUtils]);

  useEffect(() => {
    const scopeBooks = Object.keys(scope).filter((book) =>
      versification.maxVerses.hasOwnProperty(book)
    );

    if (scopeBooks.length > 0) {
      setAvailableBooks(scopeBooks);
      // Only set initial book if not already set or current book not in scope
      if (!selectedBookAbbr || !scopeBooks.includes(selectedBookAbbr)) {
        setSelectedBookAbbr(scopeBooks[0]);
        setCurrentChapter(1);
        setCurrentVerse(1);
      }
    }
  }, [scope]);

  // Update VerseRefUtils when navigation changes
  useEffect(() => {
    if (selectedBookAbbr && verseRefUtils && !isUpdatingFromVerseRef.current) {
      // Only update VerseRefUtils if we have valid data and we're not already updating from it
      verseRefUtils
        .setVerseRef({
          book: selectedBookAbbr,
          chapter: currentChapter,
          verse: currentVerse,
        })
        .catch((error) => {
          console.error("Failed to update verse reference:", error);
        });
    }

    if (selectedBookAbbr) {
      const testament = getTestamentForBook(selectedBookAbbr);
      const bookName = testament
        ? bibleBooks[testament][selectedBookAbbr].fullName
        : selectedBookAbbr;

      // Only save new state if not in verse navigation mode
      if (!isVerseNavigation) {
        const stateToSave: BibleNavState = {
          book_abbr: selectedBookAbbr,
          book_name: bookName,
          chapter: currentChapter,
          verse: currentVerse,
        };

        localStorage.setItem("bibleNavState", JSON.stringify(stateToSave));
        window.dispatchEvent(new Event("bibleNavUpdated"));
      }
    }
  }, [selectedBookAbbr, currentChapter, currentVerse, isVerseNavigation, verseRefUtils]);

  // Helper function to check if testament has any books in scope
  const hasTestamentBooks = (testament: BibleBooks): boolean => {
    return Object.keys(testament).length > 0;
  };

  // Scroll to book with improved positioning
  const scrollToBook = (bookAbbr: string) => {
    const bookElement = bookRefs.current[bookAbbr];
    const dropdownElement = dropdownRef.current;

    if (bookElement && dropdownElement) {
      bookElement.scrollIntoView({
        behavior: "smooth",
        // block: 'center'  // Ensures the book is centered in the dropdown
      });
    }
  };
  // Dropdown outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        (!event.target || !(event.target as HTMLElement).closest(".dropdown-container"))
      ) {
        setDropdownOpen(false);
        setExpandedBook(null);
        setTempSelectedBook(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (dropdownOpen && selectedBookAbbr && bookRefs.current[selectedBookAbbr]) {
      const bookElement = bookRefs.current[selectedBookAbbr];
      const dropdownElement = dropdownRef.current;

      if (bookElement && dropdownElement) {
        // Scroll the selected book into view within the dropdown
        dropdownElement.scrollTo({
          top: bookElement.offsetTop - dropdownElement.offsetTop,
          behavior: "auto",
        });
      }
    }
  }, [dropdownOpen, selectedBookAbbr]);

  // Book and chapter navigation helpers (memoized)
  const getAllBooks = React.useMemo(() => {
    return () => {
      const books: string[] = [];
      Object.values(bibleBooks).forEach((testament) => {
        books.push(...Object.keys(testament));
      });
      return books;
    };
  }, [bibleBooks]);

  const getAdjacentBook = React.useMemo(() => {
    const allBooks = getAllBooks();
    return (direction: "next" | "prev"): string | null => {
      const currentIndex = allBooks.indexOf(selectedBookAbbr);

      if (direction === "next" && currentIndex < allBooks.length - 1) {
        return allBooks[currentIndex + 1];
      }
      if (direction === "prev" && currentIndex > 0) {
        return allBooks[currentIndex - 1];
      }
      return null;
    };
  }, [selectedBookAbbr, getAllBooks]);

  const getTestamentForBook = (bookAbbr: string): "Old Testament" | "New Testament" | null => {
    if (bookAbbr in bibleBooks["Old Testament"]) return "Old Testament";
    if (bookAbbr in bibleBooks["New Testament"]) return "New Testament";
    return null;
  };

  const getSelectedBookFullName = (): string => {
    const testament = getTestamentForBook(selectedBookAbbr);
    return testament ? bibleBooks[testament][selectedBookAbbr].fullName : selectedBookAbbr;
  };

  const getTotalChapters = (bookAbbr: string): number => {
    const testament = getTestamentForBook(bookAbbr);
    return testament ? bibleBooks[testament][bookAbbr].chapters : 1;
  };

  // Navigation logic
  const isPrevDisabled = selectedBookAbbr === availableBooks[0] && currentChapter === 1;
  const isNextDisabled =
    selectedBookAbbr === availableBooks[availableBooks.length - 1] &&
    currentChapter === getTotalChapters(selectedBookAbbr || "");

  // Add verse navigation functions
  const getMaxVerses = (): number => {
    if (!selectedBookAbbr) return 1;
    const versesData = (versification as VersificationData).maxVerses[selectedBookAbbr];
    return versesData && versesData[currentChapter - 1]
      ? parseInt(versesData[currentChapter - 1])
      : 1;
  };

  const prevVerse = () => {
    if (currentVerse > 1) {
      setCurrentVerse((prev) => prev - 1);
    } else {
      // Go to previous chapter's last verse
      if (currentChapter > 1) {
        const newChapter = currentChapter - 1;
        const versesData = (versification as VersificationData).maxVerses[selectedBookAbbr];
        const maxVerse =
          versesData && versesData[newChapter - 1] ? parseInt(versesData[newChapter - 1]) : 1;

        setCurrentChapter(newChapter);
        setCurrentVerse(maxVerse);
      } else {
        // Go to previous book's last chapter and verse
        const prevBook = getAdjacentBook("prev");
        if (prevBook) {
          const prevChapter = getTotalChapters(prevBook);
          const versesData = (versification as VersificationData).maxVerses[prevBook];
          const maxVerse =
            versesData && versesData[prevChapter - 1] ? parseInt(versesData[prevChapter - 1]) : 1;

          setSelectedBookAbbr(prevBook);
          setCurrentChapter(prevChapter);
          setCurrentVerse(maxVerse);
        }
      }
    }
  };

  const nextVerse = () => {
    const maxVerses = getMaxVerses();

    if (currentVerse < maxVerses) {
      setCurrentVerse((prev) => prev + 1);
    } else {
      // Go to next chapter's first verse
      if (currentChapter < getTotalChapters(selectedBookAbbr)) {
        setCurrentChapter((prev) => prev + 1);
        setCurrentVerse(1);
      } else {
        // Go to next book's first chapter and verse
        const nextBook = getAdjacentBook("next");
        if (nextBook) {
          setSelectedBookAbbr(nextBook);
          setCurrentChapter(1);
          setCurrentVerse(1);
        }
      }
    }
  };

  // Modify chapter navigation to reset verse to 1
  const prevChapter = () => {
    if (isPrevDisabled) return;
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
      setCurrentVerse(1);
    } else {
      const prevBook = getAdjacentBook("prev");
      if (prevBook) {
        setSelectedBookAbbr(prevBook);
        setCurrentChapter(getTotalChapters(prevBook));
        setCurrentVerse(1);
      }
    }
  };

  const nextChapter = () => {
    if (isNextDisabled) return;
    if (currentChapter < getTotalChapters(selectedBookAbbr)) {
      setCurrentChapter((prev) => prev + 1);
      setCurrentVerse(1);
    } else {
      const nextBook = getAdjacentBook("next");
      if (nextBook) {
        setSelectedBookAbbr(nextBook);
        setCurrentChapter(1);
        setCurrentVerse(1);
      }
    }
  };

  // Book and chapter selection handlers
  const handleBookClick = (bookAbbr: string, event: React.MouseEvent) => {
    event.stopPropagation();

    setExpandedBook((prevBook) => (prevBook === bookAbbr ? null : bookAbbr));
    setTempSelectedBook(bookAbbr);

    setTimeout(() => {
      scrollToBook(bookAbbr);
    }, 0);
  };

  const handleDropdownToggle = () => {
    if (dropdownOpen) {
      setExpandedBook(null);
      setTempSelectedBook(null);
    } else {
      setExpandedBook(selectedBookAbbr);
    }
    setDropdownOpen((prev) => !prev);
  };

  const handleChapterSelection = (chapter: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setCurrentChapter(chapter);
    setCurrentVerse(1);
    if (tempSelectedBook) {
      setSelectedBookAbbr(tempSelectedBook);
    }
    setDropdownOpen(false);
    setExpandedBook(null);
    setTempSelectedBook(null);
  };

  return (
    <div className="relative m-auto h-10 w-fit min-w-24 max-w-xs p-2">
      <div className="flex justify-evenly align-middle">
        {showPrevChapter && (
          <button
            onClick={prevChapter}
            disabled={isPrevDisabled}
            // style={{color:isDarkMode?"white":"black"}}
            className={`mr-2 rounded-lg border-2 px-2 py-1 hover:border-blue-300 ${isDarkMode ? "border-cyan-700" : "text-zinc-700"} ${isPrevDisabled ? "cursor-not-allowed" : ""}`}>
            {"<<"}
          </button>
        )}

        {showPrevVerse && (
          <button
            onClick={prevVerse}
            className={`mr-2 rounded-lg border-2 px-2 py-1 hover:border-blue-300 ${isDarkMode ? "border-cyan-700" : "text-zinc-700"}`}>
            {"<"}
          </button>
        )}

        {showBookChapter && (
          <button
            onClick={handleDropdownToggle}
            className={`mr-2 w-52 rounded-lg border-2 px-3 py-1 hover:border-blue-300 ${isDarkMode ? "border-cyan-700" : "text-zinc-700"} `}>
            {getSelectedBookFullName()} {currentChapter}
            {isVerseNavigation ? `:${currentVerse}` : ""}
          </button>
        )}

        {showNextVerse && (
          <button
            onClick={nextVerse}
            className={`mr-2 rounded-lg border-2 px-2 py-1 hover:border-blue-300 ${isDarkMode ? "border-cyan-700" : "text-zinc-700"}`}>
            {">"}
          </button>
        )}

        {showNextChapter && (
          <button
            onClick={nextChapter}
            disabled={isNextDisabled}
            className={`rounded-lg border-2 px-2 py-1 hover:border-blue-300 ${isDarkMode ? "border-cyan-700" : "text-zinc-700"} ${isNextDisabled ? "cursor-not-allowed bg-gray-300" : ""}`}>
            {">>"}
          </button>
        )}
      </div>

      {dropdownOpen && (
        <div
          className={`z-20 max-h-96 max-w-80 overflow-hidden border-2 border-blue-200 p-2.5 ${isDarkMode ? "bg-slate-900" : "bg-white"}`}>
          <div className="h-80 overflow-y-auto pb-4 pl-4 pr-4 pt-0" ref={dropdownRef}>
            {Object.entries(bibleBooks).map(
              ([testament, testamentBooks]: [string, BibleBooks]) =>
                hasTestamentBooks(testamentBooks) && (
                  <div key={testament} className="max-w-9/10 w-full">
                    <h3
                      className={`pl-4 text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                      {testament}
                    </h3>
                    {Object.entries(testamentBooks).map(([bookAbbr, bookData]) => (
                      <div
                        key={bookAbbr}
                        ref={(el) => (bookRefs.current[bookAbbr] = el)}
                        className="relative w-full">
                        <button
                          onClick={(e) => handleBookClick(bookAbbr, e)}
                          className={`relative mt-2 block w-full bg-gray-700 p-2 text-left text-white hover:border-2 hover:border-blue-300 ${selectedBookAbbr === bookAbbr ? "border-l-8 border-l-blue-700" : ""}`}>
                          {bookData.fullName}
                        </button>

                        {expandedBook === bookAbbr && (
                          <div className="mt-3 grid grid-cols-5 gap-2">
                            {Array.from({ length: bookData.chapters }, (_, i) => i + 1).map(
                              (chapter) => (
                                <button
                                  key={chapter}
                                  onClick={(e) => handleChapterSelection(chapter, e)}
                                  className={`px-1 py-2 ${
                                    selectedBookAbbr === bookAbbr && currentChapter === chapter
                                      ? "!bg-blue-400 text-white"
                                      : isDarkMode
                                        ? "bg-gray-700 text-white hover:bg-gray-600"
                                        : "bg-stone-300 text-black hover:bg-gray-200"
                                  }`}>
                                  {chapter}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleNavigation;
