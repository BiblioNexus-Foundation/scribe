import { useState, useEffect } from "react";
import versification from "../Assets/versification.json";
import React from "react";

// Type definitions
interface BibleNavState {
  book_abbr: string;
  book_name: string;
  chapter: number;
  verse: number;
}

// Define the structure of the versification data
interface VersificationData {
  maxVerses: {
    [K in keyof typeof versification.maxVerses]: string[];
  };
}

// Type assertion for versification data
const typedVersification = versification as VersificationData;

export const NextVerse = () => {
  const [currentVerse, setCurrentVerse] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    };

    // Initial check
    checkDarkMode();

    // Create observer to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const getCurrentChapterVerses = (bookAbbr: string, chapter: number): number => {
    // Type-safe check if the book exists in versification data
    if (!bookAbbr || !(bookAbbr in typedVersification.maxVerses)) return 1;

    // Type assertion to ensure TypeScript knows this is a valid key
    const book = bookAbbr as keyof typeof typedVersification.maxVerses;
    const verseCount = typedVersification.maxVerses[book][chapter - 1];
    return verseCount ? parseInt(verseCount) : 1;
  };

  useEffect(() => {
    // Get initial state from localStorage
    const savedState = JSON.parse(localStorage.getItem("bibleNavState") || "{}") as BibleNavState;
    if (savedState.verse) {
      setCurrentVerse(savedState.verse);
      const maxVerses = getCurrentChapterVerses(savedState.book_abbr, savedState.chapter);
      setIsDisabled(savedState.verse >= maxVerses);
    }

    // Listen for navigation updates
    const handleNavUpdate = () => {
      const updatedState = JSON.parse(
        localStorage.getItem("bibleNavState") || "{}"
      ) as BibleNavState;
      if (updatedState.verse) {
        setCurrentVerse(updatedState.verse);
        const maxVerses = getCurrentChapterVerses(updatedState.book_abbr, updatedState.chapter);
        setIsDisabled(updatedState.verse >= maxVerses);
      }
    };

    window.addEventListener("bibleNavUpdated", handleNavUpdate);
    return () => window.removeEventListener("bibleNavUpdated", handleNavUpdate);
  }, []);

  const handleNextVerse = () => {
    const savedState = JSON.parse(localStorage.getItem("bibleNavState") || "{}") as BibleNavState;
    const maxVerses = getCurrentChapterVerses(savedState.book_abbr, savedState.chapter);

    if (currentVerse < maxVerses) {
      const newVerse = currentVerse + 1;
      setCurrentVerse(newVerse);

      // Update localStorage
      localStorage.setItem(
        "bibleNavState",
        JSON.stringify({
          ...savedState,
          verse: newVerse,
        })
      );

      window.dispatchEvent(new Event("bibleNavUpdated"));
    }
  };

  return (
    <button
      onClick={handleNextVerse}
      disabled={isDisabled}
      className={`mr-2 rounded-lg border-2 px-2 py-1 hover:border-blue-300 ${isDarkMode ? "border-cyan-700 text-zinc-50 hover:bg-cyan-400" : "text-zinc-700"} ${isDisabled ? "cursor-not-allowed bg-gray-300" : ""}`}>
      {">"}
    </button>
  );
};
