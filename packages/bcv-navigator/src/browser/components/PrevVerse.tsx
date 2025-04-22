
import React, { useEffect, useRef, useState } from "react";

interface TheiaTheme {
  id: string;
  type: string;
  label: string;
}

interface TheiaThemeService {
  getCurrentTheme(): TheiaTheme;
  onThemeChange(callback: (theme: TheiaTheme) => void): { dispose: () => void };
}


interface VerseRef {
  book: string;
  chapter: number;
  verse: number;
}

interface VerseRefUtils {
  getVerseRef: () => Promise<VerseRef>;
  onVerseRefChange: (callback: (ref: VerseRef) => void) => void;
  setVerseRef: (ref: VerseRef) => Promise<void>;
}

interface VerseButtonProps {
  verseRefUtils: VerseRefUtils;
}

export const PrevVerse: React.FC<VerseButtonProps> = ({ verseRefUtils }) => {
  const [currentVerse, setCurrentVerse] = useState<number>(1);
  const [currentBook, setCurrentBook] = useState<string>("");
  const [currentChapter, setCurrentChapter] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const isUpdatingFromVerseRef = useRef<boolean>(false);

  useEffect(() => {
    const isTheiaEnvironment = typeof window !== 'undefined' &&
      ((window as any).theia !== undefined || document.body.classList.contains('theia-app'));
  
    if (isTheiaEnvironment && (window as any).theia?.services?.themeService) {
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
  
      // Delay the initial check slightly to allow Theia to apply theme
      const timeoutId = setTimeout(() => {
        checkTheiaTheme();
      }, 100); // 100ms delay – can be tuned
  
      // Listen for theme changes
      let themeListener: any;
      try {
        themeListener = themeService.onThemeChange((theme: TheiaTheme) => {
          const isDark = theme.type === 'dark' ||
            theme.id.includes('dark') ||
            theme.label.toLowerCase().includes('dark');
          setIsDarkMode(isDark);
        });
      } catch (err) {
        console.error("Could not listen for Theia theme changes:", err);
        fallbackThemeDetection();
      }
  
      return () => {
        clearTimeout(timeoutId);
        if (themeListener && typeof themeListener.dispose === 'function') {
          themeListener.dispose();
        }
      };
    } else {
      fallbackThemeDetection();
    }
  
    function fallbackThemeDetection() {
      const checkDarkMode = () => {
        const hasTheiaDarkClass = document.body.classList.contains("theia-dark") ||
          document.documentElement.classList.contains("theia-dark");
  
        const hasVSCodeDarkClass = document.body.classList.contains("vscode-dark") ||
          document.body.classList.contains("vs-dark");
  
        const hasDataThemeDark = document.body.getAttribute("data-theme") === "dark";
  
        const computedStyle = window.getComputedStyle(document.body);
        const backgroundColor = computedStyle.backgroundColor;
  
        let isDarkBackground = false;
        if (backgroundColor) {
          const rgbMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (rgbMatch) {
            const [r, g, b] = [parseInt(rgbMatch[1]), parseInt(rgbMatch[2]), parseInt(rgbMatch[3])];
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            isDarkBackground = brightness < 128;
          }
        }
  
        const isDark = hasTheiaDarkClass || hasVSCodeDarkClass || hasDataThemeDark || isDarkBackground;
        setIsDarkMode(isDark);
      };
  
      // Delay initial fallback check
      const initialCheckTimeout = setTimeout(() => {
        checkDarkMode();
      }, 100);
  
      const observer = new MutationObserver(() => {
        checkDarkMode();
      });
  
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
  
  // Initialize and subscribe to verse changes
  useEffect(() => {
    verseRefUtils.getVerseRef().then((verseRef) => {
      isUpdatingFromVerseRef.current = true;
      setCurrentBook(verseRef.book);
      setCurrentChapter(verseRef.chapter);
      setCurrentVerse(verseRef.verse);
      setIsDisabled(verseRef.verse <= 1);
      isUpdatingFromVerseRef.current = false;
    });

    verseRefUtils.onVerseRefChange((verseRef) => {
      isUpdatingFromVerseRef.current = true;
      setCurrentBook(verseRef.book);
      setCurrentChapter(verseRef.chapter);
      setCurrentVerse(verseRef.verse);
      setIsDisabled(verseRef.verse <= 1);
      isUpdatingFromVerseRef.current = false;
    });
  }, [verseRefUtils]);

  const handlePrevVerse = () => {
    if (isDisabled) return;

    if (currentVerse > 1) {
      const newVerse = currentVerse - 1;

      if (!isUpdatingFromVerseRef.current) {
        verseRefUtils
          .setVerseRef({
            book: currentBook,
            chapter: currentChapter,
            verse: newVerse
          })
          .catch((error) => {
            console.error("Failed to update verse reference:", error);
          });
      }
    }
  };

  return (
    <button
      onClick={handlePrevVerse}
      disabled={isDisabled}
      // style={{ color: isDarkMode ? "white" : "black" }}
      className={`mr-2 rounded-lg border-2 px-2 py-1 hover:border-blue-300 ${
        isDarkMode ? "border-cyan-700" : "text-zinc-700"
      } ${isDisabled ? "cursor-not-allowed" : ""}`}
    >
      {"<"}
    </button>
  );
};
