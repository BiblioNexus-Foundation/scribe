import { useState, useEffect, useRef } from "react";
import React = require("react");
import versification from "../Assets/versification.json";


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

interface NavigationProps {
    showPrevChapter?: boolean;
    showPrevVerse?: boolean;
    showNextVerse?: boolean;
    showNextChapter?: boolean;
    showBookChapter?: boolean;
    scope?: Scope;  
  }
interface VersificationData {
    maxVerses: Record<string, string[]>;  
}

const fullBibleScope: Scope = {
    GEN: [], EXO: [], LEV: [], NUM: [], DEU: [], JOS: [], JDG: [], RUT: [], 
    "1SA": [], "2SA": [], "1KI": [], "2KI": [], "1CH": [], "2CH": [], EZR: [], 
    NEH: [], EST: [], JOB: [], PSA: [], PRO: [], ECC: [], SNG: [], ISA: [], 
    JER: [], LAM: [], EZK: [], DAN: [], HOS: [], JOL: [], AMO: [], OBA: [], 
    JON: [], MIC: [], NAH: [], HAB: [], ZEP: [], HAG: [], ZEC: [], MAL: [],
    MAT: [], MRK: [], LUK: [], JHN: [], ACT: [], ROM: [], "1CO": [], "2CO": [],
    GAL: [], EPH: [], PHP: [], COL: [], "1TH": [], "2TH": [], "1TI": [], "2TI": [],
    TIT: [], PHM: [], HEB: [], JAS: [], "1PE": [], "2PE": [], "1JN": [], "2JN": [],
    "3JN": [], JUD: [], REV: []
};



// Book name mapping
const bookNameMapping: { [key: string]: string } = {
    // Old Testament
    "GEN": "Genesis","EXO": "Exodus","LEV": "Leviticus","NUM": "Numbers",   "DEU": "Deuteronomy",    "JOS": "Joshua",    "JDG": "Judges",    "RUT": "Ruth",    "1SA": "1 Samuel",    "2SA": "2 Samuel",    "1KI": "1 Kings",    "2KI": "2 Kings",    "1CH": "1 Chronicles",    "2CH": "2 Chronicles",    "EZR": "Ezra",    "NEH": "Nehemiah",    "EST": "Esther",    "JOB": "Job",    "PSA": "Psalms",    "PRO": "Proverbs",    "ECC": "Ecclesiastes",    "SNG": "Song of Solomon",    "ISA": "Isaiah",    "JER": "Jeremiah",    "LAM": "Lamentations",    "EZK": "Ezekiel",    "DAN": "Daniel",    "HOS": "Hosea",    "JOL": "Joel",    "AMO": "Amos",    "OBA": "Obadiah",    "JON": "Jonah",    "MIC": "Micah",    "NAH": "Nahum",    "HAB": "Habakkuk",    "ZEP": "Zephaniah",    "HAG": "Haggai",    "ZEC": "Zechariah",    "MAL": "Malachi",
    // New Testament
    "MAT": "Matthew",    "MRK": "Mark",    "LUK": "Luke",    "JHN": "John",    "ACT": "Acts",    "ROM": "Romans",    "1CO": "1 Corinthians",    "2CO": "2 Corinthians",    "GAL": "Galatians",    "EPH": "Ephesians",    "PHP": "Philippians",    "COL": "Colossians",    "1TH": "1 Thessalonians",    "2TH": "2 Thessalonians",    "1TI": "1 Timothy",    "2TI": "2 Timothy",    "TIT": "Titus",    "PHM": "Philemon",    "HEB": "Hebrews",    "JAS": "James",    "1PE": "1 Peter",    "2PE": "2 Peter",   "1JN": "1 John",    "2JN": "2 John",    "3JN": "3 John",    "JUD": "Jude",    "REV": "Revelation"
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
const oldTestamentBooks = ["GEN", "EXO", "LEV", "NUM", "DEU", "JOS", "JDG", "RUT", "1SA", "2SA", "1KI", "2KI", "1CH", "2CH", "EZR", "NEH", "EST", "JOB", "PSA", "PRO", "ECC", "SNG", "ISA", "JER", "LAM", "EZK", "DAN", "HOS", "JOL", "AMO", "OBA", "JON", "MIC", "NAH", "HAB", "ZEP", "HAG", "ZEC", "MAL"];
const newTestamentBooks = ["MAT", "MRK", "LUK", "JHN", "ACT", "ROM", "1CO", "2CO", "GAL", "EPH", "PHP", "COL", "1TH", "2TH", "1TI", "2TI", "TIT", "PHM", "HEB", "JAS", "1PE", "2PE", "1JN", "2JN", "3JN", "JUD", "REV"];



const extractBibleBooks = (versificationData: VersificationData , currentScope: Scope): BibleStructure => {
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
                chapters: chapterCount
            };
        } else if (newTestamentBooks.includes(bookAbbr)) {
            newTestament[bookAbbr] = {
                fullName,
                chapters: chapterCount
            };
        }
    }

    return {
        "Old Testament": oldTestament,
        "New Testament": newTestament
    };
};

const BibleNavigation: React.FC<NavigationProps> = ({
    showPrevChapter = false ,
    showPrevVerse = false,
    showNextVerse = false,
    showNextChapter = false,
    showBookChapter = false,
    scope = fullBibleScope ,
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
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);


     // Add state to track whether verse navigation is active
     const isVerseNavigation = showNextVerse && showPrevVerse;


    const bibleBooks = React.useMemo(() => 
        extractBibleBooks(versification as VersificationData, scope),
        [scope]
    );

    // Effect to detect dark mode changes
    useEffect(() => {
        const checkDarkMode = () => {
            const isDark = document.documentElement.classList.contains('dark');
            setIsDarkMode(isDark);
        };

        // Initial check
        checkDarkMode();

        // Create observer to watch for class changes
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    checkDarkMode();
                }
            });
        });

        // Start observing
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class']
        });

        return () => observer.disconnect();
    }, []);


    


    useEffect(() => {
        const scopeBooks = Object.keys(scope).filter(book => 
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
   

    useEffect(() => {
        if (selectedBookAbbr) {
            const testament = getTestamentForBook(selectedBookAbbr);
            const bookName = testament ? bibleBooks[testament][selectedBookAbbr].fullName : selectedBookAbbr;

            // Only save new state if not in verse navigation mode
            if (!isVerseNavigation) {
                const stateToSave: BibleNavState = {
                    book_abbr: selectedBookAbbr,
                    book_name: bookName,
                    chapter: currentChapter,
                    verse: currentVerse,
                };

                localStorage.setItem('bibleNavState', JSON.stringify(stateToSave));
                window.dispatchEvent(new Event('bibleNavUpdated'));
            }
        }
    }, [selectedBookAbbr, currentChapter, currentVerse, isVerseNavigation]);
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
                behavior: 'smooth',
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
                (!event.target || !(event.target as HTMLElement).closest('.dropdown-container'))
            ) {
                setDropdownOpen(false);
                setExpandedBook(null);
                setTempSelectedBook(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Book and chapter navigation helpers (memoized)
    const getAllBooks = React.useMemo(() => {
        return () => {
            const books: string[] = [];
            Object.values(bibleBooks).forEach(testament => {
                books.push(...Object.keys(testament));
            });
            return books;
        };
    }, [bibleBooks]);

    const getAdjacentBook = React.useMemo(() => {
        const allBooks = getAllBooks();
        return (direction: 'next' | 'prev'): string | null => {
            const currentIndex = allBooks.indexOf(selectedBookAbbr);

            if (direction === 'next' && currentIndex < allBooks.length - 1) {
                return allBooks[currentIndex + 1];
            }
            if (direction === 'prev' && currentIndex > 0) {
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


    // Modify chapter navigation to reset verse to 1
    const prevChapter = () => {
        if (isPrevDisabled) return;
        if (currentChapter > 1) {
            setCurrentChapter(prev => prev - 1);
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
            setCurrentChapter(prev => prev + 1);
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

        setExpandedBook(prevBook => prevBook === bookAbbr ? null : bookAbbr);
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
        setDropdownOpen(prev => !prev);
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

        <div className="relative p-2 max-w-xs min-w-24  w-fit h-10 m-auto">
            <div className="flex justify-evenly align-middle ">
            {showPrevChapter && (
                <button
                    onClick={prevChapter}
                    disabled={isPrevDisabled}

                            className={`py-1 px-2 border-2 hover:border-blue-300 mr-2 rounded-lg
                                ${isDarkMode ? 'text-zinc-50  border-cyan-700': 'text-zinc-700'}
            ${isPrevDisabled ? 'bg-gray-300 cursor-not-allowed' :
                                ''}`
                            }
                >
                    {'<<'}
                </button>
  )}
          
                {showBookChapter && (
                <button
                    onClick={handleDropdownToggle}
                    className={`py-1 px-3 w-52 border-2 hover:border-blue-300 mr-2 rounded-lg
                            ${isDarkMode ? 'text-zinc-50 border-cyan-700': 'text-zinc-700'}
                            `}
                >
                    {getSelectedBookFullName()} {currentChapter}
                </button>)}
              
                {showNextChapter && (
                <button
                    onClick={nextChapter}
                    disabled={isNextDisabled}
                  
                            className={`py-1 px-2 border-2 hover:border-blue-300 rounded-lg
                                ${isDarkMode ? 'text-zinc-50  border-cyan-700': 'text-zinc-700'}
            ${isNextDisabled ? 'bg-gray-300 cursor-not-allowed' :
                               ''}`
                            }
                >
                    {'>>'}
                </button>)}
            </div>

            {dropdownOpen && (
                <div className={`max-h-96 z-20 overflow-hidden p-2.5 border-2 border-blue-200 max-w-80
        ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                    {/* <div className={`pl-4 font-semibold text-xl 
            ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        Go To
                    </div> */}

                    <div className="h-80 overflow-y-auto pt-0 pl-4 pb-4 pr-4" ref={dropdownRef}>
                        {Object.entries(bibleBooks).map(([testament, testamentBooks]: [string, BibleBooks]) => (
                            hasTestamentBooks(testamentBooks) && (
                                <div key={testament} className="w-full max-w-9/10">
                                    <h3 className={`pl-4 font-bold text-lg
                            ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                        {testament}
                                    </h3>
                                    {Object.entries(testamentBooks).map(([bookAbbr, bookData]) => (
                                        <div key={bookAbbr} ref={el => bookRefs.current[bookAbbr] = el}
                                            className="w-full relative">
                                            <button
                                                onClick={(e) => handleBookClick(bookAbbr, e)}
                                                className={`mt-2 block w-full p-2 text-left relative
                                        text-white bg-gray-700 '}
                                        hover:border-2 hover:border-blue-300
                                        ${selectedBookAbbr === bookAbbr ? 'border-l-8 border-l-blue-700' : ''}`}
                                            >
                                                {bookData.fullName}
                                            </button>

                                            {expandedBook === bookAbbr && (
                                                <div className="grid grid-cols-5 gap-2 mt-3">
                                                    {Array.from({ length: bookData.chapters }, (_, i) => i + 1).map((chapter) => (
                                                        <button
                                                            key={chapter}
                                                            onClick={(e) => handleChapterSelection(chapter, e)}
                                                            className={`px-1 py-2
                                                    ${selectedBookAbbr === bookAbbr && currentChapter === chapter
                                                                    ? '!bg-blue-400 text-white'
                                                                    : isDarkMode
                                                                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                                                                        : 'bg-stone-300 text-black hover:bg-gray-200'}`}
                                                        >
                                                            {chapter}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BibleNavigation;
