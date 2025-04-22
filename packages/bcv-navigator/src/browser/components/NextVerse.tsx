
import { useState, useEffect, useRef } from "react";
import versification from "../Assets/versification.json";
import React from "react";

interface TheiaTheme {
  id: string;
  type: string;
  label: string;
}

interface TheiaThemeService {
  getCurrentTheme(): TheiaTheme;
  onThemeChange(callback: (theme: TheiaTheme) => void): { dispose: () => void };
}


// Define the structure of the versification data
interface VersificationData {
  maxVerses: {
    [bookAbbr: string]: string[];
  };
}

// VerseRef interfaces to match BibleNavigation
export interface VerseRefValue {
  book: string;
  chapter: number;
  verse: number;
}

interface VerseRefUtilsInterface {
  getVerseRef(): Promise<VerseRefValue>;
  setVerseRef(verseRef: VerseRefValue): Promise<void>;
  onVerseRefChange(callback: (verseRef: VerseRefValue) => void): void; // FIX: It doesn't return a Promise
}

interface VerseButtonProps {
  verseRefUtils: VerseRefUtilsInterface;
}

// Type assertion for versification data
const typedVersification = versification as VersificationData;

export const NextVerse: React.FC<VerseButtonProps> = ({ verseRefUtils }) => {
  const [currentVerse, setCurrentVerse] = useState<number>(1);
  const [currentBook, setCurrentBook] = useState<string>("");
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const isUpdatingFromVerseRef = useRef<boolean>(false);

  // Detect dark mode
  

  useEffect(() => {
    // Try to detect if we're in a Theia environment
    const isTheiaEnvironment = typeof window !== 'undefined' && 
      (window as any).theia !== undefined || document.body.classList.contains('theia-app');
    
    if (isTheiaEnvironment && (window as any).theia?.services?.themeService) {
      // Access Theia theme service directly
      const themeService = (window as any).theia.services.themeService as TheiaThemeService;
      
      // Function to check theme
      const checkTheiaTheme = () => {
        try {
          const currentTheme = themeService.getCurrentTheme();
          const isDark = currentTheme.type === 'dark' || 
                        currentTheme.id.includes('dark') || 
                        currentTheme.label.toLowerCase().includes('dark');
          
          console.debug("Theia theme detected:", currentTheme.label, isDark ? "dark" : "light");
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
          const isDark = theme.type === 'dark' || 
                        theme.id.includes('dark') || 
                        theme.label.toLowerCase().includes('dark');
          setIsDarkMode(isDark);
        });
        
        return () => {
          // Clean up the listener when component unmounts
          if (themeListener && typeof themeListener.dispose === 'function') {
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
        const hasTheiaDarkClass = document.body.classList.contains("theia-dark") || 
                                document.documentElement.classList.contains("theia-dark");
        
        const hasVSCodeDarkClass = document.body.classList.contains("vscode-dark") || 
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
        
        const isDark = hasTheiaDarkClass || hasVSCodeDarkClass || hasDataThemeDark || isDarkBackground;
        
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
        attributeFilter: ["class", "data-theme"]
      });
      
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "data-theme"]
      });
      
      return () => {
        clearTimeout(initialCheckTimeout);
        observer.disconnect();
      };
    }
  }, []);

  // Initialize from VerseRefUtils
  useEffect(() => {
    verseRefUtils.getVerseRef().then((verseRef) => {
      isUpdatingFromVerseRef.current = true;
      setCurrentBook(verseRef.book);
      setCurrentChapter(verseRef.chapter);
      setCurrentVerse(verseRef.verse);
      updateDisabledState(verseRef.book, verseRef.chapter, verseRef.verse);
      isUpdatingFromVerseRef.current = false;
    });

    verseRefUtils.onVerseRefChange((verseRef) => {
      isUpdatingFromVerseRef.current = true;
      setCurrentBook(verseRef.book);
      setCurrentChapter(verseRef.chapter);
      setCurrentVerse(verseRef.verse);
      updateDisabledState(verseRef.book, verseRef.chapter, verseRef.verse);
      isUpdatingFromVerseRef.current = false;
    });
  }, [verseRefUtils]);

  const getCurrentChapterVerses = (bookAbbr: string, chapter: number): number => {
    if (!bookAbbr || !(bookAbbr in typedVersification.maxVerses)) return 1;

    const chapterArray = typedVersification.maxVerses[bookAbbr];
    const verseCount = chapterArray?.[chapter - 1];
    return verseCount ? parseInt(verseCount, 10) : 1;
  };

  const updateDisabledState = (book: string, chapter: number, verse: number) => {
    const maxVerses = getCurrentChapterVerses(book, chapter);
    setIsDisabled(verse >= maxVerses);
  };

  const handleNextVerse = () => {
    if (isDisabled) return;

    const maxVerses = getCurrentChapterVerses(currentBook, currentChapter);

    if (currentVerse < maxVerses) {
      const newVerse = currentVerse + 1;

      if (!isUpdatingFromVerseRef.current) {
        verseRefUtils.setVerseRef({
          book: currentBook,
          chapter: currentChapter,
          verse: newVerse,
        }).catch((error) => {
          console.error("Failed to update verse reference:", error);
        });
      }
    }
  };

  return (
    <button
      onClick={handleNextVerse}
      disabled={isDisabled}
      // style={{ color: isDarkMode ? "white" : "black" }}
      className={`mr-2 rounded-lg border-2 px-2 py-1 hover:border-blue-300 ${
        isDarkMode ? "border-cyan-700" : "text-zinc-700"
      } ${isDisabled ? "cursor-not-allowed" : ""}`}
    >
      {">"}
    </button>
  );
};
